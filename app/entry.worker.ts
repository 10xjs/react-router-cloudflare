import type { GoTrueClient } from "@supabase/auth-js";
import { fromHono } from "chanfana";
import { type Context, Hono } from "hono";
// import { drizzle } from "drizzle-orm/d1";
import { createRequestHandler, unstable_setDevServerHooks } from "react-router";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { type TokenPayload, createClient, verifyToken } from "./lib/auth";
import { getRequestOrigin } from "./lib/headers";

export type AppEnv = {
  Bindings: Env;
  Variables: {
    auth: GoTrueClient;
    user: TokenPayload | null;
    origin: string;
  };
};

export type AppContext = Context<AppEnv>;

declare module "react-router" {
  export interface AppLoadContext {
    c: AppContext;
  }
}

// Start a Hono app
const app = new Hono<AppEnv>();

app.use(async function originMiddleware(c, next) {
  c.set("origin", getRequestOrigin(c.req.raw));
  return next();
});

app.use(async function authMiddleware(c, next) {
  const auth = createClient(c);

  const { data } = await auth.getSession();
  const token = data.session?.access_token;

  c.set("auth", auth);
  c.set("user", token ? await verifyToken(c, token) : null);

  return next();
});

// Setup OpenAPI registry
const apiV1 = fromHono(app.basePath("/api/v1"), {
  docs_url: "/",
  base: "/api/v1",
});

// Register OpenAPI endpoints
apiV1.get("/tasks", TaskList);
apiV1.post("/tasks", TaskCreate);
apiV1.get("/tasks/:taskSlug", TaskFetch);
apiV1.delete("/tasks/:taskSlug", TaskDelete);

const remixHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

// https://github.com/jacob-ebey/react-router-cloudflare/blob/841b9f5eed547e105574965bbf381b4ae1626642/workers/app.ts#L26
app.use((c) => {
  if (import.meta.env.DEV) {
    unstable_setDevServerHooks({
      getCriticalCss: (c.env as any).__RPC.__reactRouterGetCriticalCss,
    });
  }

  return remixHandler(c.req.raw, { c });
});

export default {
  async fetch(request, env) {
    return app.fetch(request, env);
  },
} satisfies ExportedHandler<Env>;
