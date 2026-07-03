import type { MouseEvent } from "react";
import type { Product } from "../type";

interface ProductCardProps {
  product: Product;
  isOpen: boolean;
  onToggle: () => void;
  onBuy: (product: Product) => void;
}

export default function ProductCard({
  product,
  isOpen,
  onToggle,
  onBuy,
}: ProductCardProps) {
  function handleCardClick(): void {
    alert(product.name);
  }

  function handleBuy(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    onBuy(product);
  }

  function handleToggle(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    onToggle();
  }

  return (
    <div
      onClick={handleCardClick}
      style={{
        border: "1px solid gray",
        marginBottom: 20,
        padding: 15,
        cursor: "pointer",
      }}
    >
      <h2>{product.name}</h2>

      <p>${product.price}</p>

      {product.inStock ? (
        <p style={{ color: "green" }}>
          In Stock
        </p>
      ) : (
        <p style={{ color: "red" }}>
          Out of Stock
        </p>
      )}

      {product.inStock && (
        <button onClick={handleBuy}>
          Buy Now
        </button>
      )}

      <button onClick={handleToggle}>
        {isOpen ? "Hide Detail" : "Show Detail"}
      </button>

      {isOpen && (
        <div style={{ marginTop: 10 }}>
          <hr />
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}
