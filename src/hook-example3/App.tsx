import {
  startTransition,
  useCallback,
  useOptimistic,
  useReducer,
  useState,
  useTransition,
} from "react";

import type {
  CartItem,
  Product,
} from "./types/product";

import { cartReducer } from "./reducer/cartReducer";
import { addToCartApi } from "./api/cartApi";

import { ProductList } from "./components/ProductList";
import { CartItems } from "./components/CartItems";
import { CartSummary } from "./components/CartSummary";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Keyboard",
    price: 80,
  },
  {
    id: 2,
    name: "Mouse",
    price: 40,
  },
  {
    id: 3,
    name: "Monitor",
    price: 300,
  },
];

export default function App() {
  /*
  useState:
  Simple state to display the message.  */
  const [message, setMessage] = useState("");

  /*
    useReducer:

    Cart has many action:
    - add
    - remove
    - clear

  */
  const [cartItems, dispatch] = useReducer(
    cartReducer,
    []
  );

  /*
    useTransition:
    Marking "Update cart" as "Background update".
  */
  const [isPending, startCartTransition] =
    useTransition();

  /*
    useOptimistic:
    The product appears in the cart immediately before the API returns anything.
  */
  const [optimisticCart, addOptimisticItem] =
    useOptimistic(
      cartItems,
      (
        currentCart,
        product: Product
      ): CartItem[] => {
        const existingItem = currentCart.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          return currentCart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  pending: true,
                }
              : item
          );
        }

        return [
          ...currentCart,
          {
            ...product,
            quantity: 1,
            pending: true,
          },
        ];
      }
    );

  /*
    useCallback:
    Keep the function stable so that CartItems use memo without unnecessary re-rendering.

  */
  const handleRemove = useCallback((id: number) => {
    dispatch({
      type: "remove",
      id,
    });

    setMessage("Removed item from cart");
  }, []);

  function handleAdd(product: Product) {
    setMessage("");

    startCartTransition(async () => {
      /*
        Optimistic update:
        Cart Display products now.
      */
      addOptimisticItem(product);

      const savedProduct =
        await addToCartApi(product);

      /*
        Update the actual state.
        Because setState after await is not automatically included in Transition, wrap startTransition in it.
      */
      startTransition(() => {
        dispatch({
          type: "add",
          product: savedProduct,
        });

        setMessage(
          `${savedProduct.name} added to cart`
        );
      });
    });
  }

  return (
    <main
      style={{
        width: 500,
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Shopping Cart Hooks Demo</h1>

      {message && <p>{message}</p>}

      {isPending && <p>Updating cart...</p>}

      <ProductList
        products={PRODUCTS}
        onAdd={handleAdd}
      />

      <hr />

      <CartSummary items={optimisticCart} />

      <CartItems
        items={optimisticCart}
        onRemove={handleRemove}
      />
    </main>
  );
}
