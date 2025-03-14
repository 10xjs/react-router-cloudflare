import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { reactRouterDevTools } from "react-router-devtools";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://github.com/rphlmr/react-router-hono-server
export default defineConfig(({ mode }) => ({
  plugins: [
    // https://github.com/cloudflare/workers-sdk/tree/main/packages/vite-plugin-cloudflare#readme
    mode === "development" && cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouterDevTools(),
    reactRouter(),
    tsconfigPaths(),
  ],
}));
