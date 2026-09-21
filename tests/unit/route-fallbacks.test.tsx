import { fireEvent, render, screen } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import GlobalError from "@/app/global-error";

it("does not install a global blank loading boundary over page navigation", () => {
  expect(existsSync(join(process.cwd(), "src/app/loading.tsx"))).toBe(false);
});

it("provides a retry path when the root layout fails", () => {
  const reset = vi.fn();

  render(<GlobalError error={new Error("route failed")} reset={reset} />);

  expect(screen.getByRole("alert")).toHaveTextContent("The site could not load");
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(reset).toHaveBeenCalledOnce();
});
