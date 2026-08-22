import { defineConfig } from "@playwright/test";

const viewports = [
  ["desktop-1440", 1440, 1000],
  ["desktop-1280", 1280, 900],
  ["tablet-1024", 1024, 768],
  ["tablet-768", 768, 1024],
  ["mobile-390", 390, 844],
  ["mobile-375", 375, 812],
] as const;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 4,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3100",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "off",
  },
  projects: viewports.map(([name, width, height]) => ({
    name,
    use: { viewport: { width, height } },
  })),
  webServer: process.env.E2E_EXTERNAL_SERVER
    ? undefined
    : {
        command:
          "node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3100",
        reuseExistingServer: false,
        timeout: 120_000,
        url: "http://127.0.0.1:3100",
      },
});
