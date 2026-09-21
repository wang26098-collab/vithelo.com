import { execFileSync } from "node:child_process";

import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

describe("deployment cache protection", () => {
  it("uses the current commit as the deployment identifier", () => {
    const commit = execFileSync("git", ["rev-parse", "--short=12", "HEAD"], {
      encoding: "utf8",
    }).trim();
    const expectedDeploymentId =
      process.env.NEXT_DEPLOYMENT_ID?.trim() ||
      process.env.GIT_COMMIT_SHA?.trim() ||
      process.env.COMMIT_SHA?.trim() ||
      process.env.GITHUB_SHA?.trim() ||
      commit;

    expect(nextConfig.deploymentId).toBe(expectedDeploymentId);
  });
});
