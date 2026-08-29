import path from "node:path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    exclude: [
      ...configDefaults.exclude,
      "tests/e2e/**",
      "tests/unit/deployment-runtime.test.mjs",
      "vithelo-homepage-work/tests/**",
    ],
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
