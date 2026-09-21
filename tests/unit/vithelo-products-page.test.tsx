import { fireEvent, render, screen, within } from "@testing-library/react";
import DosageFormPage from "@/app/products/[slug]/page";
import { VitheloProductsPage } from "@/components/patterns/vithelo-products-page";
import { VitheloDosageFormDetail } from "@/components/patterns/vithelo-dosage-form-detail";
import { vitheloB2BProductsPage } from "@/content/demo/vithelo-b2b-site";

const routeQuery = vi.hoisted(() => ({ product: "gummies-concept-02" }));

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("notFound");
  },
  useSearchParams: () =>
    new URLSearchParams(routeQuery.product ? `product=${routeQuery.product}` : ""),
}));

afterEach(() => {
  routeQuery.product = "gummies-concept-02";
});

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
  const product = vitheloB2BProductsPage.discovery.items[1];
  render(<VitheloDosageFormDetail format={vitheloB2BProductsPage.formats[0]} product={product} />);
  expect(screen.getByRole("heading", { name: product.title })).toBeVisible();
  expect(product.parameters && screen.getByText(new RegExp(product.parameters[0].label))).toBeVisible();
  expect(screen.getByTestId("pdp-story-image")).toHaveAttribute("src", expect.stringContaining("beauty-gummies-default"));
  fireEvent.click(screen.getByRole("button", { name: "View product image 2" }));
  expect(screen.getByTestId("pdp-story-image")).toHaveAttribute(
    "src",
    expect.stringContaining("beauty-gummies-hand"),
  );
});

it("publishes the approved gallery-info layout contract", () => {
  render(<VitheloDosageFormDetail format={vitheloB2BProductsPage.formats[0]} />);

  expect(screen.getByRole("main")).toHaveAttribute("data-pdp-layout", "gallery-info");
  expect(screen.getByTestId("format-gallery")).toHaveAttribute("data-gallery-aspect", "945/645");
  expect(screen.getByRole("link", { name: /get a free quote/i })).toHaveAttribute("href", "/contact");
});

it("renders source boundaries and approved product-specific sections", () => {
  const product = {
    ...vitheloB2BProductsPage.discovery.items[1],
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

it("resolves the target product from the client route query before rendering", async () => {
  const targetProduct = vitheloB2BProductsPage.discovery.items[1];

  render(
    await DosageFormPage({
      params: Promise.resolve({ slug: "gummies" }),
    }),
  );

  expect(screen.getByRole("heading", { name: targetProduct.title })).toBeVisible();
  expect(screen.getByRole("main")).toHaveAttribute(
    "data-pdp-layout",
    "vithelo-project-story",
  );
});

it("renders the VITHELO project story for every discovered product", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];
  const nextProduct = vitheloB2BProductsPage.discovery.items[1];

  const { rerender } = render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={target}
    />,
  );

  expect(screen.getByRole("main")).toHaveAttribute("data-pdp-layout", "vithelo-project-story");
  expect(
    screen.getByRole("heading", {
      name: target.pdpStory?.capabilityHeadline,
    }),
  ).toBeVisible();

  rerender(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={nextProduct}
    />,
  );

  expect(screen.getByRole("main")).toHaveAttribute("data-pdp-layout", "vithelo-project-story");
  expect(screen.getByRole("heading", { name: nextProduct.pdpStory?.capabilityHeadline })).toBeVisible();
});

it("renders the project hero, DEMO_ONLY boundary and project disclosures", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={target}
    />,
  );

  expect(screen.getByTestId("pdp-story-hero")).toBeVisible();
  expect(screen.getByTestId("pdp-story-gallery")).toHaveAttribute(
    "data-active-index",
    "0",
  );
  expect(screen.getByRole("note")).toHaveTextContent(
    /pending production verification/i,
  );
  expect(screen.getByText(/price, moq, lead time/i)).toBeVisible();
  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/contact",
  );

  const parameters = screen.getByRole("button", {
    name: "Project parameters",
  });
  expect(parameters).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(
    screen.getByRole("button", { name: "Customization options" }),
  );
  expect(
    screen.getByRole("button", { name: "Customization options" }),
  ).toHaveAttribute("aria-expanded", "true");
});

it("renders Concept 01 from the client route query boundary", async () => {
  routeQuery.product = "gummies-concept-01";
  render(
    await DosageFormPage({
      params: Promise.resolve({ slug: "gummies" }),
    }),
  );

  expect(screen.getByRole("main")).toHaveAttribute(
    "data-pdp-layout",
    "vithelo-project-story",
  );
  expect(
    screen.getByRole("heading", {
      name: vitheloB2BProductsPage.discovery.items[0].title,
    }),
  ).toBeVisible();
});

it("changes the project gallery image and exposes approved visual failure state", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];
  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={target}
    />,
  );

  const gallery = screen.getByTestId("pdp-story-gallery");
  const firstImage = screen.getByAltText(target.media?.default.alt ?? "");
  fireEvent.error(firstImage);
  expect(
    screen.getByText("DEMO_ONLY · AWAITING APPROVED VISUAL"),
  ).toBeVisible();

  fireEvent.click(screen.getByRole("button", { name: "View product image 2" }));
  expect(gallery).toHaveAttribute("data-active-index", "1");
  expect(
    screen.queryByText("DEMO_ONLY · AWAITING APPROVED VISUAL"),
  ).not.toBeInTheDocument();
  expect(screen.getByTestId("pdp-story-image")).toHaveAttribute(
    "src",
    expect.stringContaining("beauty-gummies-detail"),
  );
});

it("reads verification and manufacturing review copy from the story record", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];
  const product = {
    ...target,
    pdpStory: {
      ...target.pdpStory!,
      verificationNotice: "DEMO_ONLY · Custom verification boundary.",
      manufacturingReviewItems: [
        "Review item one",
        "Review item two",
        "Review item three",
        "Review item four",
      ],
    },
  };

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={product}
    />,
  );

  expect(screen.getByRole("note")).toHaveTextContent(
    product.pdpStory.verificationNotice,
  );
  const manufacturing = screen.getByRole("button", {
    name: "Manufacturing review",
  });
  manufacturing.focus();
  expect(manufacturing).toHaveFocus();
  expect(manufacturing).toHaveAttribute("type", "button");
  fireEvent.click(manufacturing);
  expect(manufacturing).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText("Review item four")).toBeVisible();
});

it("renders the capability field, four-stage project path and four decisions", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={target}
    />,
  );

  expect(screen.getAllByTestId("pdp-capability-item")).toHaveLength(4);
  expect(screen.getAllByTestId("pdp-project-stage")).toHaveLength(4);
  expect(screen.getAllByTestId("pdp-decision")).toHaveLength(4);
  expect(
    screen.getByRole("heading", { name: target.pdpStory?.projectHeadline }),
  ).toBeVisible();
  expect(
    screen.getByRole("heading", { name: target.pdpStory?.decisionHeadline }),
  ).toBeVisible();
});

it("renders review boundaries, packaging, quality, FAQ and direct inquiry", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={target}
    />,
  );

  expect(screen.getAllByTestId("pdp-review-row")).toHaveLength(4);
  expect(screen.getAllByTestId("pdp-packaging-item")).toHaveLength(3);
  expect(screen.getAllByTestId("pdp-quality-item")).toHaveLength(3);
  expect(screen.getByText("Selected")).toBeVisible();
  expect(screen.getAllByText("To confirm")).toHaveLength(3);

  const firstFaq = screen.getByRole("button", {
    name: target.pdpStory?.faqs[0].title,
  });
  const secondFaq = screen.getByRole("button", {
    name: target.pdpStory?.faqs[1].title,
  });
  const faqButtons = target.pdpStory!.faqs.map((faq) =>
    screen.getByRole("button", { name: faq.title }),
  );
  expect(firstFaq).toHaveAttribute("aria-expanded", "true");
  expect(secondFaq).toHaveAttribute("aria-expanded", "false");
  faqButtons.forEach((button, index) => {
    const panel = document.getElementById(
      button.getAttribute("aria-controls") ?? "",
    );
    expect(panel).toHaveAttribute("role", "region");
    expect(panel).toHaveAttribute("aria-labelledby", button.id);
    if (index === 0) {
      expect(panel).not.toHaveAttribute("hidden");
    } else {
      expect(panel).toHaveAttribute("hidden");
    }
  });
  fireEvent.click(secondFaq);
  expect(firstFaq).toHaveAttribute("aria-expanded", "false");
  expect(secondFaq).toHaveAttribute("aria-expanded", "true");
  expect(
    document.getElementById(firstFaq.getAttribute("aria-controls") ?? ""),
  ).toHaveAttribute("hidden");
  expect(
    document.getElementById(secondFaq.getAttribute("aria-controls") ?? ""),
  ).not.toHaveAttribute("hidden");
  expect(
    screen.getByText(target.pdpStory?.faqs[1].copy ?? ""),
  ).toBeVisible();

  expect(
    screen.getByRole("link", { name: "Discuss Concept 01" }),
  ).toHaveAttribute("href", "/contact");
});

it("shows an accessible DEMO_ONLY fallback when packaging media fails", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];
  const firstPackaging = target.pdpStory!.packagingItems[0];
  const firstPackagingMedia = target.gallery![0];

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={target}
    />,
  );

  const packagingItem = screen.getAllByTestId("pdp-packaging-item")[0];
  fireEvent.error(
    within(packagingItem).getByRole("img", {
      name: firstPackagingMedia.alt,
    }),
  );

  expect(
    within(packagingItem).getByRole("img", {
      name: `DEMO_ONLY · ${firstPackaging.title} visual awaiting approval`,
    }),
  ).toHaveTextContent("DEMO_ONLY · AWAITING APPROVED VISUAL");
});

it("shows accessible fallbacks when narrative media fails", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={target}
    />,
  );

  const capability = screen.getByRole("region", {
    name: target.pdpStory?.capabilityHeadline,
  });
  fireEvent.error(
    within(capability).getByRole("img", {
      name: target.gallery?.[0].alt,
    }),
  );
  expect(
    within(capability).getByRole("img", {
      name: "DEMO_ONLY · Product definition visual awaiting approval",
    }),
  ).toBeVisible();

  const projectPath = screen.getByRole("region", {
    name: target.pdpStory?.projectHeadline,
  });
  fireEvent.error(
    within(projectPath).getByRole("img", {
      name: target.gallery?.[1].alt,
    }),
  );
  expect(
    within(projectPath).getByRole("img", {
      name: "DEMO_ONLY · Project path visual awaiting approval",
    }),
  ).toBeVisible();
});

it("reads the final inquiry label from the story record", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];
  const product = {
    ...target,
    pdpStory: {
      ...target.pdpStory!,
      inquiry: {
        ...target.pdpStory!.inquiry,
        label: "Discuss this demonstration",
      },
    },
  };

  render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={product}
    />,
  );

  expect(
    screen.getByRole("link", { name: "Discuss this demonstration" }),
  ).toHaveAttribute("href", "/contact");
});

it("falls back to the format overview when the route query targets another format", async () => {
  const foreignProduct = vitheloB2BProductsPage.discovery.items[0];
  routeQuery.product = foreignProduct.id;

  render(
    await DosageFormPage({
      params: Promise.resolve({ slug: "hard-capsules" }),
    }),
  );

  expect(screen.queryByRole("heading", { name: foreignProduct.title })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /for your next line/i })).toBeVisible();
});
