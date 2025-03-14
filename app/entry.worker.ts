import type { GoTrueClient } from "@supabase/auth-js";
import { QueryClient } from "@tanstack/react-query";
import { fromHono } from "chanfana";
import { type Context, Hono } from "hono";
// import { drizzle } from "drizzle-orm/d1";
import { createRequestHandler } from "react-router";
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
    queryClient: QueryClient;
  }
}

// Start a Hono app
const app = new Hono<AppEnv>();

if (import.meta.env.DEV) {
  // https://github.com/facebook/react/issues/32339
  app.get("/installHook.js.map", (c) => {
    return c.text("Not found", 404);
  });
}

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

app.use((c) => {
  const remixHandler = createRequestHandler(
    async () => {
      // @ts-expect-error - virtual module provided by React Router at build time
      const build = await import("virtual:react-router/server-build");
      return build;
    },
    import.meta.env?.MODE
  );

  const queryClient = new QueryClient();

  return remixHandler(c.req.raw, { c, queryClient });
});

export default {
  async fetch(request, env) {
    return app.fetch(request, env);
  },
} satisfies ExportedHandler<Env>;
