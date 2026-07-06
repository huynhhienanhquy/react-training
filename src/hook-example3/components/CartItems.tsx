import { memo } from "react";
import type { CartItem } from "../types/product";

type CartItemsProps = {
  items: CartItem[];
  onRemove: (id: number) => void;
};

/*
  memo:
  CartItems only re-render when items or onRemove change.
  For effective memos:
  Use useCallback in the app for onRemove.
*/
export const CartItems = memo(function CartItems({
  items,
  onRemove,
}: CartItemsProps) {
  console.log("CartItems render");

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <section>
      <h2>Cart Items</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            opacity: item.pending ? 0.5 : 1,
          }}
        >
          <strong>{item.name}</strong>

          <span>
            {" "}
            ${item.price} x {item.quantity}
          </span>

          {item.pending && <em> saving...</em>}

          <button onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </section>
  );
});
