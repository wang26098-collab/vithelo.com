import { readFileSync } from "node:fs";
import { join } from "node:path";

it("keeps product detail navigation static and out of the client query boundary", () => {
  const source = readFileSync(
    join(process.cwd(), "src/app/products/[slug]/page.tsx"),
    "utf8",
  );

  expect(source).not.toContain("searchParams");
  expect(source).toContain("generateStaticParams");
  expect(source).toContain("vitheloB2BProductsPage.discovery.items.map");
  expect(source).not.toContain("VitheloProductDetailRoute");
});
