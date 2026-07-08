export type Participant = {
   id: number;
  name: string;
  email: string;
  ticket: "Standard" | "VIP";
  status: "Checked In" | "Pending";
}

export const participants: Participant[] = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    email: "minhanh@gmail.com",
    ticket: "VIP",
    status: "Checked In",
  },
  {
    id: 2,
    name: "Trần Quốc Bảo",
    email: "quocbao@gmail.com",
    ticket: "Standard",
    status: "Pending",
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    email: "hoangnam@gmail.com",
    ticket: "VIP",
    status: "Checked In",
  },
]
