import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
} from "react-router";
import { Toaster } from "~/components/ui/sonner";
import type { Route } from "./+types/root";
import "./app.css";
import { partialDehydrate, withHydrationBoundary } from "./lib/tanstack-query";
import { authUserQuery } from "./queries/auth";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader = async ({ context }: Route.LoaderArgs) => {
  await context.queryClient.ensureQueryData({
    ...authUserQuery(),
    queryFn: () => context.c.get("user"),
  });

  return data({
    dehydratedState: partialDehydrate(context.queryClient),
  });
};

// https://reactrouter.com/start/framework/route-module#shouldrevalidate
// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return false;
// };

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default withHydrationBoundary(function App() {
  return <Outlet />;
});
