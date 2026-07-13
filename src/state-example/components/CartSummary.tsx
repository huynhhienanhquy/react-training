import type { Product } from "../types/product";

type CartSummaryProps = {
  cart: Product[];
};

export default function CartSummary({ cart }: CartSummaryProps) {
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div
      style={{
        marginTop: 24,
        padding: 16,
        border: "1px solid #333",
        borderRadius: 8,
      }}
    >
      <h2>Cart Summary</h2>
      <p>Items: {cart.length}</p>
      <p>Total: ${total}</p>
    </div>
  );
}
