import { GoTrueClient } from "@supabase/auth-js";
import { parse, serialize } from "cookie";
import * as jose from "jose";
import { z } from "zod";
import type { AppContext } from "~/entry.worker";

export const SESSION_COOKIE_NAME = "__session";

export const createClient = (c: AppContext) => {
  return new GoTrueClient({
    url: `${c.env.SUPABASE_URL}/auth/v1`,
    headers: {
      Authorization: `Bearer ${c.env.SUPABASE_ANON_KEY}`,
      apikey: c.env.SUPABASE_ANON_KEY,
    },
    storageKey: SESSION_COOKIE_NAME,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    debug: false,
    hasCustomAuthorizationHeader: true,
    storage: {
      isServer: true,
      getItem: (key: string) => {
        const cookie = c.req.header("Cookie");
        const parsed = cookie ? parse(cookie) : null;
        return parsed?.[key] ?? null;
      },
      setItem: (key: string, value: string) => {
        if (key === SESSION_COOKIE_NAME) {
          const parsed = JSON.parse(value);
          parsed.user = undefined;
          value = JSON.stringify(parsed);
        }

        console.log("setItem", key, value);

        c.res.headers.append(
          "Set-Cookie",
          serialize(key, value, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
          })
        );
      },
      removeItem: (key: string) => {
        c.res.headers.append(
          "Set-Cookie",
          serialize(key, "", {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
          })
        );
      },
    },
  });
};

const TokenPayload = z.object({
  aal: z.string(),
  amr: z.array(
    z.object({
      method: z.string(),
      timestamp: z.number(),
    })
  ),
  app_metadata: z.record(z.any()),
  aud: z.string(),
  email: z.string(),
  exp: z.number(),
  iat: z.number(),
  is_anonymous: z.boolean(),
  iss: z.string(),
  phone: z.string(),
  role: z.string(),
  session_id: z.string(),
  sub: z.string(),
  user_metadata: z.record(z.any()),
});
export type TokenPayload = z.infer<typeof TokenPayload>;

export const verifyToken = async (c: AppContext, token: string) => {
  let payload: z.infer<typeof TokenPayload> | null = null;

  if (import.meta.env.DEV && !c.env.SUPABASE_JWT_SECRET) {
    try {
      payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    try {
      ({ payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(c.env.SUPABASE_JWT_SECRET),
        {
          algorithms: ["HS256"],
        }
      ));
    } catch (error) {
      console.error(error);
      if (error instanceof jose.errors.JOSEError) {
        return null;
      }
      throw error;
    }
  }

  const parsed = TokenPayload.safeParse(payload);

  if (!parsed.success) {
    console.error(parsed.error);
    return null;
  }

  return parsed.data;
};
