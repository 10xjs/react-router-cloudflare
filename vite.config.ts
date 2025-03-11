import { vitePluginViteNodeMiniflare } from "@hiogawa/vite-node-miniflare";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeWorkerOptions } from "miniflare";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wrangler from "wrangler";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: "./app/worker/index.ts",
        }
      : undefined,
  },
  ssr: {
    target: "webworker",
    noExternal: true,
    resolve: {
      conditions: ["workerd", "browser"],
    },
    optimizeDeps: {
      include: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom",
        "react-dom/server",
        "react-router",
      ],
    },
  },
  plugins: [
    // https://github.com/hi-ogawa/vite-plugins/blob/bd88cc5886fe89224fa80a1545e9337d46c66825/packages/vite-node-miniflare/src/server/plugin.ts
    vitePluginViteNodeMiniflare({
      entry: "./app/entry.worker.ts",
      miniflareOptions: (options) => {
        // https://github.com/hi-ogawa/vite-plugins/blob/3dd50716bbca49ec475d6a6f732518a7643f7e75/packages/vite-node-miniflare/src/plugin.ts#L132
        const wranglerOptions = wrangler.unstable_getMiniflareWorkerOptions(
          "./wrangler.jsonc",
          "development"
        );
        // biome-ignore lint/performance/noDelete: <explanation>
        delete wranglerOptions.workerOptions.sitePath;

        mergeWorkerOptions(options, wranglerOptions.workerOptions);
      },
      // allow framework to extend RPC to implement some features on main Vite process and expose them to Workerd
      // (e.g. Remix's DevServerHooks)
      // https://github.com/hi-ogawa/vite-plugins/blob/bd88cc5886fe89224fa80a1545e9337d46c66825/packages/vite-node-miniflare/src/server/plugin.ts#L97
      customRpc: {
        // DevServerHook is implemented via custom rpc
        // https://github.com/remix-run/react-router/blob/796e9ae10f74ba453b738f9d80049885f24caccf/packages/react-router/lib/server-runtime/dev.ts#L10
        __reactRouterGetCriticalCss: async (...args: any[]) => {
          return (globalThis as any).__reactRouterDevServerHooks.getCriticalCss(
            ...args
          );
        },
      },
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
}));
