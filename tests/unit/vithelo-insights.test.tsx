import { render, screen } from "@testing-library/react";
import { VitheloInsightArticle } from "@/components/patterns/vithelo-insight-article";
import { VitheloInsightsPage } from "@/components/patterns/vithelo-insights-page";
import { vitheloB2BInsightsPage } from "@/content/demo/vithelo-b2b-site";

it("renders ten numbered insight stories with demo media and working links", () => {
  render(<VitheloInsightsPage content={vitheloB2BInsightsPage} />);

  expect(screen.getByTestId("insights-hero")).toHaveAttribute(
    "data-motion-intent",
    "ORIENT",
  );
  expect(screen.getByTestId("insights-paper")).toBeInTheDocument();
  expect(screen.getAllByTestId("insight-topic")).toHaveLength(5);

  const stories = screen.getAllByTestId("insight-story");
  expect(stories).toHaveLength(10);
  expect(stories[0]).toHaveAttribute("data-insight-index", "01");
  expect(stories[9]).toHaveAttribute("data-insight-index", "10");
  expect(screen.getAllByRole("img")).toHaveLength(10);
  expect(
    screen.getByRole("link", {
      name: "How to Choose the Right Supplement Format",
    }),
  ).toHaveAttribute("href", "/insights/choose-the-right-supplement-format");
});

it("renders configured article blocks and omits unconfigured media actions", () => {
  render(
    <VitheloInsightArticle
      article={vitheloB2BInsightsPage.articles[0]}
      relatedArticles={vitheloB2BInsightsPage.articles.slice(1)}
    />,
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "How to Choose the Right Supplement Format",
  );
  expect(screen.getByRole("table")).toBeVisible();
  expect(
    screen.queryByRole("button", { name: /download/i }),
  ).not.toBeInTheDocument();
  expect(screen.queryByText(/video not configured/i)).not.toBeInTheDocument();
});
