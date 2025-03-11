import { DurableObject } from "cloudflare:workers";
// import { drizzle } from "drizzle-orm/d1";
import {
  createCookieSessionStorage,
  createRequestHandler,
  unstable_setDevServerHooks,
} from "react-router";
// import { DatabaseContext } from "~/database/context";
// import * as schema from "~/database/schema";
import { SessionContext } from "~/lib/session";

declare module "react-router" {
  export interface AppLoadContext {
    VALUE_FROM_CLOUDFLARE: string;
    env: Env;
  }
}

const remixHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env) {
    // const db = drizzle(env.DB, { schema });
    const sessionStorage = createCookieSessionStorage({
      cookie: {
        path: "/",
        sameSite: "lax",
        secrets: [env.SESSION_SECRET],
        secure: request.url.startsWith("https://"),
      },
    });

    const session = await sessionStorage.getSession(
      request.headers.get("Cookie")
    );
    const lastSetCookie = await sessionStorage.commitSession(session);

    // expose env.kv
    // Object.assign(globalThis, { env });

    if (import.meta.env.DEV) {
      unstable_setDevServerHooks({
        getCriticalCss: (env as any).__RPC.__reactRouterGetCriticalCss,
      });
    }

    const response = await SessionContext.run(session, () =>
      remixHandler(request, {
        VALUE_FROM_CLOUDFLARE: "Hello from Cloudflare",
        env,
      })
    );

    const setCookie = await sessionStorage.commitSession(session);
    if (lastSetCookie !== setCookie) {
      const headers = new Headers(response.headers);
      headers.append("Set-Cookie", setCookie);

      return new Response(response.body, {
        cf: response.cf,
        headers,
        status: response.status,
        statusText: response.statusText,
        webSocket: response.webSocket,
      });
    }

    return response;
  },
} satisfies ExportedHandler<Env>;

export class MyWorker extends DurableObject<Env> {
  async fetch(request: Request) {
    return new Response("Hello from Durable Object");
  }
}
