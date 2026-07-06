import type {
  CartAction,
  CartItem,
} from "../types/product";

/*
  Reducer manages the shopping cart.
  Does not mutate the old state.
  Always returns the new array/object.
*/
export function cartReducer(
  state: CartItem[],
  action: CartAction
): CartItem[] {
  switch (action.type) {
    case "add": {
      const existingItem = state.find(
        (item) => item.id === action.product.id
      );

      if (existingItem) {
        return state.map((item) =>
          item.id === action.product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...state,
        {
          ...action.product,
          quantity: 1,
        },
      ];
    }

    case "remove":
      return state.filter(
        (item) => item.id !== action.id
      );

    case "clear":
      return [];

    default:
      return state;
  }
}
