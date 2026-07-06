import type { Product } from "../types/product";

type ProductListProps = {
  products: Product[];
  onAdd: (product: Product) => void;
};

/*

This component only displays the product list.
The logic for adding products to the cart is in the app.

*/

export function ProductList({
  products,
  onAdd,
}: ProductListProps) {
  return (
    <section>
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <strong>{product.name}</strong>{" "}
          <span>${product.price}</span>

          <button onClick={() => onAdd(product)}>
            Add to cart
          </button>
        </div>
      ))}
    </section>
  )
}
