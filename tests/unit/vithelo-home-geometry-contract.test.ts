import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

it("keeps screen four on the approved Nordicus editorial geometry", () => {
  const css = readFileSync(
    join(process.cwd(), "src/components/patterns/vithelo-b2b-home.module.css"),
    "utf8",
  );

  expect(css).toMatch(
    /\.homepage \.customizationSection\s*\{[\s\S]*?background:\s*#fbfbfb;/,
  );
  expect(css).toMatch(
    /\.homepage \.customizationLayout\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*0\.96fr\)\s+minmax\(360px,\s*1\.04fr\);/,
  );
  expect(css).toMatch(/\.homepage \.customizationSection\s*\{[\s\S]*?padding-inline:\s*calc\(var\(--home-frame-gutter\)\s*-\s*16px\);/);
  expect(css).toMatch(
    /\.customizationMediaFrame\s*\{[\s\S]*?aspect-ratio:\s*4\s*\/\s*3;[\s\S]*?border-radius:\s*20px;/,
  );
  expect(css).toMatch(
    /\.customizationDecisionGrid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);/,
  );
});

it("keeps every homepage height and padding declaration locked", () => {
  const css = readFileSync(
    join(process.cwd(), "src/components/patterns/vithelo-b2b-home.module.css"),
    "utf8",
  );
  const geometryDeclarations = css
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) =>
      /^(--home-frame-gutter|--home-screen|min-height:|height:|padding:|padding-block:|padding-inline:|padding-top:|padding-right:|padding-bottom:|padding-left:)/.test(
        line,
      ),
    )
    .join("\n");

  // The hash below intentionally includes the two new geometry declarations
  // that the brand-statement CTA introduces:
  //   .brandStatementAction { min-height: 48px; padding-inline: 1.75rem; }
  // The .formatIntro block now removes its min-height: var(--home-screen-min-height)
  // and its padding-block so the intro sits compactly above the format wall,
  // matching the reference layout (title + qualifier + explore-all on one
  // shallow row, then immediately the cards).
  // The .formatWall padding-block is tightened from var(--home-screen-space-y)
  // to clamp(0.75rem, 1vw, 1rem) so the qualifier-to-first-card distance
  // matches the kicker-to-title and title-to-qualifier gaps in the editorial
  // reference. No other screen's height, padding or min-height was modified
  // — the .brandStatementSceneCopy container still anchors at 190px /
  // clamp bottom.
  // Spec 2026-09-13 (第五屏固定图像 + 移动裁切窗口): the .marketScene
  // cards are now one viewport tall on desktop (height: 100svh) so the
  // three stacked sticky windows form a continuous scroll reveal; on
  // ≤ 760px the sticky + window effect is dropped and the scene card
  // height returns to auto (the mobile @media block is filtered out of
  // this hash because the regex doesn't match across blocks).
  expect(createHash("sha256").update(geometryDeclarations).digest("hex").toUpperCase()).toBe(
    "5C15C3A189E79C78EC8450ACD3A4271119D30C61968937AEF553541694E93C13",
  );
});
