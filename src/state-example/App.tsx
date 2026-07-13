import { useState } from "react";

import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import ProductList from "./components/ProductList";
import CartSummary from "./components/CartSummary";

import { products as productData } from "./data/products";
import type { Product } from "./types/product";

export default function App() {
  // State save keyword search
  const [search, setSearch] = useState("");

  // State save category currently selecting
  const [category, setCategory] = useState("All");

  // Array state: stores products in the shopping cart
  const [cart, setCart] = useState<Product[]>([]);

  // State in Array format: stores favorite product IDs
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // Filter products by search + category
  const filteredProducts = productData.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  // Callback props: passed down to ProductCard
  const handleAddCart = (product: Product) => {
    // Functional update + Immutable update
    setCart((prevCart) => [...prevCart, product]);
  };

  // Callback props: passed down to ProductCard
  const handleToggleFavorite = (id: number) => {
    setFavoriteIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((item) => item !== id);
      }

      return [...prevIds, id];
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Product Store</h1>

      <SearchBar
        search={search}
        onSearchChange={setSearch}
      />

      <br />
      <br />

      <FilterPanel
        category={category}
        onCategoryChange={setCategory}
      />

      <ProductList
        products={filteredProducts}
        favoriteIds={favoriteIds}
        onAddCart={handleAddCart}
        onToggleFavorite={handleToggleFavorite}
      />

      <CartSummary cart={cart} />
    </div>
  );
}
