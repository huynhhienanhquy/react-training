export interface Order {
  id: number;
  customer: string;
  product: string;
  total: number;
  date: string;
  status: "Pending" | "Completed" | "Cancelled";
}
