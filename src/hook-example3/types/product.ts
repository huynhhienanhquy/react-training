export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = Product & {
  quantity: number;
  pending?: boolean;
};

export type CartAction =
  | {type: "add", product: Product}
  | {type: "remove", id: number}
  | {type: "clear"};
