import ProductCard from "./ProductCard";
import type { Product } from "../types/product";

type ProductListProps = {
  products: Product[];
  favoriteIds: number[];
  onAddCart: (product: Product) => void;
  onToggleFavorite: (id: number) => void;
};

export default function ProductList({
  products,
  favoriteIds,
  onAddCart,
  onToggleFavorite,
}: ProductListProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
        marginTop: 20,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteIds.includes(product.id)}
          onAddCart={onAddCart}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
