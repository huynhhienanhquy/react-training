import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { AuthFooter } from "./AuthFooter";

describe("AuthFooter", () => {
  it("renders question and action text", () => {
    render(
      <AuthFooter
        questionText="Don't have an account?"
        actionText="Sign up"
        onActionClick={() => {}}
      />
    );

    expect(
      screen.getByText("Don't have an account?")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sign up")
    ).toBeInTheDocument();
  });

  it("calls onActionClick when action text is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <AuthFooter
        questionText="Already have an account?"
        actionText="Login"
        onActionClick={handleClick}
      />
    );

    await user.click(screen.getByText("Login"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <AuthFooter
        questionText="Question"
        actionText="Action"
        onActionClick={() => {}}
        className="custom-footer"
      />
    );

    expect(container.firstChild).toHaveClass("custom-footer");
  });

  it("uses default className when none is provided", () => {
    const { container } = render(
      <AuthFooter
        questionText="Question"
        actionText="Action"
        onActionClick={() => {}}
      />
    );

    expect(container.firstChild).toHaveClass("text-center");
    expect(container.firstChild).toHaveClass("text-sm2");
  });
});
