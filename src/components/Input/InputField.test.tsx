import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InputField } from ".";

describe("InputField", () => {
  it("renders the label and a text input by default", () => {
    render(
      <InputField
        label="Email"
        placeholder="you@example.com"
      />
    );

    expect(
      screen.getByText("Email")
    ).toBeInTheDocument();

    const input =
      screen.getByPlaceholderText("you@example.com");

    expect(input)
      .toHaveAttribute("type", "text");
  });


  it("forwards native input props", () => {
    const onChange = vi.fn();

    render(
      <InputField
        label="Email"
        type="email"
        name="email"
        required
        disabled
        onChange={onChange}
      />
    );

    const input =
      screen.getByRole("textbox");


    expect(input)
      .toHaveAttribute("type", "email");

    expect(input)
      .toHaveAttribute("name", "email");

    expect(input)
      .toBeRequired();

    expect(input)
      .toBeDisabled();
  });


  it("calls onChange when text is entered", () => {
    const onChange = vi.fn();

    render(
      <InputField
        label="Full name"
        onChange={onChange}
      />
    );


    fireEvent.change(
      screen.getByRole("textbox"),
      {
        target: {
          value: "Nguyen Van A",
        },
      }
    );


    expect(onChange)
      .toHaveBeenCalledTimes(1);
  });


  it("applies normal input styles for a non-password field", () => {
    render(
      <InputField
        label="Email"
        type="email"
      />
    );


    expect(
      screen.getByRole("textbox")
    ).toHaveClass(
      "bg-gray-50/30",
      "focus:border-blue-500"
    );
  });


  it("renders password input as hidden initially", () => {
    render(
      <InputField
        label="Password"
        type="password"
      />
    );


    const input =
      document.querySelector(
        "input"
      );


    expect(input)
      .toHaveAttribute(
        "type",
        "password"
      );


    expect(input)
      .toHaveClass(
        "bg-blue-50/40",
        "focus:border-blue-400",
        "pr-12"
      );


    expect(
      screen.getByRole("button")
    ).toHaveAttribute(
      "type",
      "button"
    );
  });


  it("toggles password visibility", () => {
    render(
      <InputField
        label="Password"
        type="password"
      />
    );


    const input =
      document.querySelector(
        "input"
      );


    const toggleButton =
      screen.getByRole("button");


    expect(input)
      .toHaveAttribute(
        "type",
        "password"
      );


    fireEvent.click(toggleButton);


    expect(input)
      .toHaveAttribute(
        "type",
        "text"
      );


    fireEvent.click(toggleButton);


    expect(input)
      .toHaveAttribute(
        "type",
        "password"
      );
  });


  it("does not show a password toggle for non-password inputs", () => {
    render(
      <InputField
        label="Email"
        type="email"
      />
    );


    expect(
      screen.queryByRole("button")
    ).not.toBeInTheDocument();
  });


  it("merges a custom className into the input", () => {
    render(
      <InputField
        label="Username"
        className="custom-input border-green-500"
      />
    );


    expect(
      screen.getByRole("textbox")
    ).toHaveClass(
      "custom-input",
      "border-green-500"
    );
  });
});
