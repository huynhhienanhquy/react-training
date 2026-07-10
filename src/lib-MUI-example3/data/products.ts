import type { Product } from "../types/product";

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Gaming Mouse",
    category: "Accessories",
    price: 29,
    stock: 50,
    status: "Active",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 89,
    stock: 35,
    status: "Active",
  },
  {
    id: 3,
    name: "Gaming Headset",
    category: "Audio",
    price: 69,
    stock: 0,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Monitor 27 Inch",
    category: "Monitor",
    price: 299,
    stock: 12,
    status: "Active",
  },
  {
    id: 5,
    name: "USB-C Hub",
    category: "Accessories",
    price: 39,
    stock: 20,
    status: "Active",
  },
];
