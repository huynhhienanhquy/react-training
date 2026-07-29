import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {

  it("uses default variant styles when variant is omitted", () => {
    render(
      <Card>
        Default card
      </Card>
    );


    const card = screen
      .getByText("Default card")
      .closest("div");


    expect(card).toHaveClass(
      "bg-white",
      "rounded-3xl",
      "border",
      "border-slate-100",
      "shadow-sm"
    );
  });


  it("uses surface variant styles", () => {
    render(
      <Card variant="surface">
        Surface card
      </Card>
    );


    const card = screen
      .getByText("Surface card")
      .closest("div");


    expect(card).toHaveClass(
      "bg-surface",
      "rounded-3xl",
      "border",
      "border-slate-100",
      "shadow-sm"
    );
  });


  it("merges custom className with variant styles", () => {
    render(
      <Card
        variant="surface"
        className="custom-card"
      >
        Custom card
      </Card>
    );


    const card = screen
      .getByText("Custom card")
      .closest("div");


    expect(card).toHaveClass(
      "bg-surface",
      "rounded-3xl",
      "border",
      "border-slate-100",
      "shadow-sm",
      "custom-card"
    );
  });

});
