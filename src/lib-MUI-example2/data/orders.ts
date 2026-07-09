import type { Order } from "../types/order";

export const orders: Order[] = [
  {
    id: 1001,
    customer: "Nguyen Van A",
    product: "Gaming Mouse",
    total: 29,
    date: "2026-07-01",
    status: "Completed",
  },
  {
    id: 1002,
    customer: "Tran Thi B",
    product: "Mechanical Keyboard",
    total: 89,
    date: "2026-07-02",
    status: "Pending",
  },
  {
    id: 1003,
    customer: "Le Van C",
    product: "USB-C Hub",
    total: 39,
    date: "2026-07-03",
    status: "Cancelled",
  },
  {
    id: 1004,
    customer: "Pham Thi D",
    product: "Monitor 27 Inch",
    total: 299,
    date: "2026-07-04",
    status: "Completed",
  },
  {
    id: 1005,
    customer: "Hoang Van E",
    product: "Laptop 14\"",
    total: 899,
    date: "2026-07-05",
    status: "Pending",
  },
];
