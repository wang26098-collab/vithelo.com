import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(
  join(
    process.cwd(),
    "src/components/patterns/vithelo-about-page.module.css",
  ),
  "utf8",
);

it("locks the About page to the Nordicus hero and homepage content grid", () => {
  expect(css).toContain("--about-hero-gutter: var(--about-frame-gutter)");
  expect(css).toContain("height: var(--vithelo-page-hero-height)");
  expect(css).toMatch(/\.heroCopy h1\s*\{[\s\S]*font-family: Georgia/);
  expect(css).toMatch(/\.heroCopy h1\s*\{[\s\S]*white-space: nowrap/);
  expect(css).toMatch(
    /@media \(min-width: 1201px\)[\s\S]*--about-frame-gutter: var\(--site-frame-wide-inset\)/,
  );
  expect(css).toMatch(
    /@media \(max-width: 620px\)[\s\S]*--about-frame-gutter: var\(--site-frame-compact-inset\)/,
  );
  expect(css).not.toMatch(/\.heroCopy\s*\{[^}]*\d+vh/);
});
