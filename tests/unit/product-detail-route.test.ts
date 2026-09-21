import { readFileSync } from "node:fs";
import { join } from "node:path";

it("keeps product detail navigation static and resolves the product query in a client boundary", () => {
  const source = readFileSync(
    join(process.cwd(), "src/app/products/[slug]/page.tsx"),
    "utf8",
  );

  expect(source).not.toContain("searchParams");
  expect(source).toContain("VitheloProductDetailRoute");
  expect(source).toContain("<Suspense");
});
