import { redirect } from "react-router";
import { safeRedirect } from "remix-utils/safe-redirect";
import type { Route } from "./+types/auth-callback";

export const loader = async ({ context }: Route.LoaderArgs) => {
  const requestUrl = new URL(context.c.req.url);

  const auth = context.c.get("auth");

  const result = await auth.exchangeCodeForSession(
    requestUrl.searchParams.get("code") ?? ""
  );

  if (result.error) {
    const params = new URLSearchParams();
    if (result.error.code) {
      params.set("code", result.error.code);
    }
    if (result.error.message) {
      params.set("message", result.error.message);
    }
    throw redirect(`/auth/error?${params.toString()}`);
  }

  return redirect(safeRedirect(requestUrl.searchParams.get("next"), "/"));
};
