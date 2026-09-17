import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

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

  expect(createHash("sha256").update(geometryDeclarations).digest("hex").toUpperCase()).toBe(
    "F5B1606DA80C01A16CA1FB1592E109CE19759BF3661988152CE0599217D2A644",
  );
});
