import { act, fireEvent, render, screen } from "@testing-library/react";
import Loading from "@/app/loading";
import GlobalError from "@/app/global-error";

it("keeps route loading lightweight and offers recovery after a stalled navigation", () => {
  vi.useFakeTimers();

  try {
    render(<Loading />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading the next page");
    expect(
      screen.queryByText("Preparing the requested task and its current system state."),
    ).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(10_000));

    expect(screen.getByRole("button", { name: "Reload page" })).toBeVisible();
  } finally {
    vi.useRealTimers();
  }
});

it("provides a retry path when the root layout fails", () => {
  const reset = vi.fn();

  render(<GlobalError error={new Error("route failed")} reset={reset} />);

  expect(screen.getByRole("alert")).toHaveTextContent("The site could not load");
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(reset).toHaveBeenCalledOnce();
});
