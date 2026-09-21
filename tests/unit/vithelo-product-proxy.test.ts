import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

it("redirects a validated legacy product query before rendering", () => {
  const response = proxy(
    new NextRequest(
      "https://vithelo.com/products/gummies?product=gummies-concept-02",
    ),
  );

  expect(response.status).toBe(308);
  expect(response.headers.get("location")).toBe(
    "https://vithelo.com/products/gummies-concept-02",
  );
});

it("does not redirect a product query that belongs to another format", () => {
  const response = proxy(
    new NextRequest(
      "https://vithelo.com/products/gummies?product=tablets-concept-02",
    ),
  );

  expect(response.headers.get("x-middleware-next")).toBe("1");
});
