import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  future: {
    // https://github.com/remix-run/react-router/pull/13066
    unstable_viteEnvironmentApi: true,
  },
} satisfies Config;
