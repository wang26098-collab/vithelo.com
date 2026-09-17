import { fireEvent, render, screen } from "@testing-library/react";
import { VitheloProductsPage } from "@/components/patterns/vithelo-products-page";
import { VitheloDosageFormDetail } from "@/components/patterns/vithelo-dosage-form-detail";
import { vitheloB2BProductsPage } from "@/content/demo/vithelo-b2b-site";

// The detail page reads `?product=` on the client via useSearchParams.
// Tests render without a router, so default to empty params; individual
// tests can mutate `useSearchParamsState.params` to simulate deep links.
const useSearchParamsState = vi.hoisted(() => ({ params: new URLSearchParams() }));
vi.mock("next/navigation", () => ({
  useSearchParams: () => useSearchParamsState.params,
}));

it("renders eight dosage formats and ten Gummies products by default", () => {
  render(<VitheloProductsPage content={vitheloB2BProductsPage} />);
  // The filter panel exposes eight format pills.
  expect(document.querySelectorAll("button[aria-pressed]")).toHaveLength(8);
  expect(screen.queryByRole("button", { name: "Pet Health" })).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Gummies" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByTestId("product-runway").children).toHaveLength(10);
});

it("shows only the selected format's ten products", () => {
  render(<VitheloProductsPage content={vitheloB2BProductsPage} />);
  fireEvent.click(screen.getByRole("button", { name: "Capsules" }));
  expect(screen.getByRole("button", { name: "Capsules" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByTestId("product-runway").children).toHaveLength(10);
  expect(screen.getAllByRole("link", { name: /Capsules Concept/ })).toHaveLength(10);
  expect(screen.getAllByRole("link", { name: /Capsules Concept/ })[0]).toHaveAttribute(
    "href",
    "/products/hard-capsules?product=hard-capsules-concept-01",
  );
  expect(screen.queryByRole("link", { name: /Gummies Concept/ })).not.toBeInTheDocument();
});

it("changes the product detail gallery state when a view is selected", () => {
  render(<VitheloDosageFormDetail format={vitheloB2BProductsPage.formats[0]} />);
  fireEvent.click(screen.getByRole("button", { name: "View product image 1" }));
  expect(screen.getByTestId("format-gallery")).toHaveAttribute("data-gallery-view", "MAIN");
});

it("passes the selected product copy and parameters into the detail view", () => {
  const product = vitheloB2BProductsPage.discovery.items[0];
  render(<VitheloDosageFormDetail format={vitheloB2BProductsPage.formats[0]} product={product} />);
  expect(screen.getByRole("heading", { name: product.title })).toBeVisible();
  expect(product.parameters && screen.getByText(product.parameters[0].value)).toBeVisible();
  expect(screen.getByTestId("format-gallery-image")).toHaveAttribute("src", expect.stringContaining("beauty-gummies-default"));
  fireEvent.click(screen.getByRole("button", { name: "View product image 2" }));
  expect(screen.getByTestId("format-gallery-image")).toHaveAttribute("src", expect.stringContaining("beauty-gummies-detail"));
});

it("publishes the approved gallery-info layout contract", () => {
  render(<VitheloDosageFormDetail format={vitheloB2BProductsPage.formats[0]} />);

  expect(screen.getByRole("main")).toHaveAttribute("data-pdp-layout", "gallery-info");
  expect(screen.getByTestId("format-gallery")).toHaveAttribute("data-gallery-aspect", "945/645");
  expect(screen.getByRole("link", { name: /get a free quote/i })).toHaveAttribute("href", "/contact");
});

it("renders source boundaries and approved product-specific sections", () => {
  const product = {
    ...vitheloB2BProductsPage.discovery.items[0],
    sourceBoundary:
      "USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION" as const,
    detailSections: [
      {
        id: "ingredients" as const,
        title: "Ingredients",
        items: ["Source-provided ingredient statement"],
      },
    ],
  };

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={product}
    />,
  );

  expect(
    screen.getByText(/pending production verification/i),
  ).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Ingredients" }));
  expect(screen.getByText("Source-provided ingredient statement")).toBeVisible();
});

it("resolves the active product from ?product= when no explicit product prop is provided", () => {
  const targetProduct = vitheloB2BProductsPage.discovery.items[0];
  const formatProducts = vitheloB2BProductsPage.discovery.items.filter(
    (item) => item.formatSlug === vitheloB2BProductsPage.formats[0].id,
  );

  // Simulate arriving at `/products/<slug>?product=<id>`.
  useSearchParamsState.params = new URLSearchParams(
    `product=${encodeURIComponent(targetProduct.id)}`,
  );

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      products={formatProducts}
    />,
  );

  expect(screen.getByRole("heading", { name: targetProduct.title })).toBeVisible();
  expect(screen.getByTestId("format-gallery-image")).toHaveAttribute(
    "src",
    expect.stringContaining("beauty-gummies-default"),
  );

  // Reset for downstream tests.
  useSearchParamsState.params = new URLSearchParams();
});

it("falls back to the format overview when the ?product= id does not belong to the current format", () => {
  // The first item is Gummies; asking for it on the Capsules page must not render its title.
  const formatProducts = vitheloB2BProductsPage.discovery.items.filter(
    (item) => item.formatSlug === vitheloB2BProductsPage.formats[2].id, // hard-capsules
  );
  const foreignProduct = vitheloB2BProductsPage.discovery.items[0];

  useSearchParamsState.params = new URLSearchParams(
    `product=${encodeURIComponent(foreignProduct.id)}`,
  );

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[2]}
      products={formatProducts}
    />,
  );

  // Foreign product must not show its title; the format overview heading appears instead.
  expect(screen.queryByRole("heading", { name: foreignProduct.title })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /for your next line/i })).toBeVisible();

  useSearchParamsState.params = new URLSearchParams();
});
