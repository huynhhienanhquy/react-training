import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 25,
    category: "Accessories",
    rating: 4,
    image: "https://picsum.photos/300/200?random=1",
    inStock: true,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 80,
    category: "Accessories",
    rating: 5,
    image: "https://picsum.photos/300/200?random=2",
    inStock: true,
  },
  {
    id: 3,
    name: "Gaming Headset",
    price: 60,
    category: "Audio",
    rating: 4,
    image: "https://picsum.photos/300/200?random=3",
    inStock: false,
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 35,
    category: "Office",
    rating: 3,
    image: "https://picsum.photos/300/200?random=4",
    inStock: true,
  },
];
