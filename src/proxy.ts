import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const legacyProductIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*-concept-\d+$/;

export function proxy(request: NextRequest) {
  const formatSlug = request.nextUrl.pathname.split("/").at(-1);
  const productId = request.nextUrl.searchParams.get("product");

  if (
    !formatSlug ||
    !productId ||
    !legacyProductIdPattern.test(productId) ||
    !productId.startsWith(`${formatSlug}-concept-`)
  ) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = `/products/${productId}`;
  destination.searchParams.delete("product");

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: [
    {
      source: "/products/:slug",
      has: [{ type: "query", key: "product" }],
    },
  ],
};
