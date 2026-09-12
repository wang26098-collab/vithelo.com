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
    "93415C6E2C52BC910C987538F7B33C913CCE512C8D54C4A9AF99B2B360BE898C",
  );
});
