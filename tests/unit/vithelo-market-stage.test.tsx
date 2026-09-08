import { render, screen, within } from "@testing-library/react";
import { VitheloMarketStage } from "@/components/patterns/vithelo-market-stage";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";

it("renders three product directions in one sticky viewport without controls", () => {
  render(<VitheloMarketStage market={vitheloB2BHome.market} />);

  const stage = screen.getByTestId("market-stage");
  const stories = screen.getAllByTestId("market-story");

  expect(stage).toHaveAttribute("data-layout", "sticky-product-switcher");
  expect(stage).toHaveAttribute("data-motion-intent", "RELATE");
  expect(stories).toHaveLength(3);
  expect(screen.getAllByTestId("market-story-image")).toHaveLength(3);
  expect(screen.getAllByTestId("market-step")).toHaveLength(3);
  for (const story of stories) expect(story).not.toHaveAttribute("aria-hidden");
  expect(stage).not.toHaveAttribute("data-active-story");
  expect(within(stage).queryByRole("button")).not.toBeInTheDocument();
  expect(stage).not.toHaveTextContent(/\d{2} \/ \d{2}/);
});
