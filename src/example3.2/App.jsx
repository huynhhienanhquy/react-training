import { useState } from "react";
import ProductCard from "./components/ProductCard";

const products = [
  {
    id: 1,
    name: "MacBook Pro",
    price: 2500,
    inStock: true,
    description: "Apple M4 Pro"
  },
  {
    id: 2,
    name: "iPhone 17",
    price: 1400,
    inStock: false,
    description: "Out of stock"
  }
];

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  function handleBuy(product) {
    alert(`Buying ${product.name}`);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Product List</h1>

      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isOpen={selectedId === product.id}
          onToggle={() =>
            setSelectedId(
              selectedId === product.id
                ? null
                : product.id
            )
          }
          onBuy={handleBuy}
        />
      ))}
    </div>
  );
}
