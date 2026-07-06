import { useMemo } from "react";
import type { CartItem } from "../types/product";

type CartSummaryProps = {
  items: CartItem[];
};

/*
  useMemo:
  The total is only recalculated when the items change.
  If the app re-renders due to a different state, it will not be recalculated.
*/
export function CartSummary({
  items,
}: CartSummaryProps) {
  const total = useMemo(() => {
    console.log("Calculate total");

    return items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  }, [items]);

  return (
    <section>
      <h2>Cart Summary</h2>

      <p>Total items: {totalQuantity}</p>
      <p>Total price: ${total}</p>
    </section>
  );
}
