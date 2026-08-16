import { readFileSync } from "node:fs";

describe("A-Prime token contract", () => {
  const css = readFileSync("src/styles/tokens.css", "utf8");

  it("defines the locked token families", () => {
    for (const token of [
      "--color-ivory",
      "--color-graphite",
      "--color-titanium",
      "--color-optical",
      "--space-4",
      "--space-160",
      "--motion-fast",
      "--motion-immersive",
      "--container-standard",
      "--focus-ring",
    ]) {
      expect(css).toContain(token);
    }
  });

  it("defines light and dark semantic color parity", () => {
    const semanticTokens = [
      "--color-background",
      "--color-surface",
      "--color-foreground",
      "--color-muted",
      "--color-border",
      "--color-focus",
    ];

    const rootBlock = css.match(/:root\s*{([\s\S]*?)}/)?.[1];
    const darkBlock = css.match(/\[data-theme="dark"\]\s*{([\s\S]*?)}/)?.[1];

    expect(rootBlock).toBeDefined();
    expect(darkBlock).toBeDefined();
    for (const token of semanticTokens) {
      expect(rootBlock).toContain(token);
      expect(darkBlock).toContain(token);
    }
  });

  it("keeps the spacing and radius scales constrained", () => {
    for (const step of [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160]) {
      expect(css).toContain(`--space-${step}:`);
    }
    for (const radius of [0, 4, 8, 12]) {
      expect(css).toContain(`--radius-${radius}:`);
    }
  });
});
