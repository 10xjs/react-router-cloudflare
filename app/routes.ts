import { type RouteConfig, prefix, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/index.tsx"),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  ...prefix("auth", [
    route("callback", "routes/auth-callback.tsx"),
    route("error", "routes/auth-error.tsx"),
  ]),
  route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
