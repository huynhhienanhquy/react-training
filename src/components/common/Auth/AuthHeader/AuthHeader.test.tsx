import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AuthHeader } from ".";

describe("AuthHeader", () => {
  it("renders title and subtitle", () => {
    render(
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue"
      />
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Welcome Back",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sign in to continue")
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <AuthHeader
        title="Welcome"
        subtitle="Subtitle"
        className="custom-header"
      />
    );

    expect(container.firstChild).toHaveClass("custom-header");
  });

  it("uses default classes when className is not provided", () => {
    const { container } = render(
      <AuthHeader
        title="Welcome"
        subtitle="Subtitle"
      />
    );

    expect(container.firstChild).toHaveClass("space-y-2");
    expect(container.firstChild).toHaveClass("mb-2");
    expect(container.firstChild).toHaveClass("md:mb-4");
  });

  it("renders the title as an h2 element", () => {
    render(
      <AuthHeader
        title="Login"
        subtitle="Please sign in"
      />
    );

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Login",
    });

    expect(heading.tagName).toBe("H2");
  });
});
