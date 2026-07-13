import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  isFavorite: boolean;
  onAddCart: (product: Product) => void;
  onToggleFavorite: (id: number) => void;
};

export default function ProductCard({
  product,
  isFavorite,
  onAddCart,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <h2>
        {product.image} {product.name}
      </h2>

      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>

      <button onClick={() => onToggleFavorite(product.id)}>
        {isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
      </button>

      <button
        onClick={() => onAddCart(product)}
        style={{ marginLeft: 8 }}
      >
        Add Cart
      </button>
    </div>
  );
}
