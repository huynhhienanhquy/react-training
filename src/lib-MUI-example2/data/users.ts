import type { User } from "../types/user";

// Mock data người dùng
export const users: User[] = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "vana@gmail.com",
    role: "Admin",
    avatar: "A",
    status: "Active",
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "thib@gmail.com",
    role: "Manager",
    avatar: "B",
    status: "Active",
  },
  {
    id: 3,
    name: "Le Van C",
    email: "vanc@gmail.com",
    role: "User",
    avatar: "C",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Pham Thi D",
    email: "thid@gmail.com",
    role: "User",
    avatar: "D",
    status: "Active",
  },
  {
    id: 5,
    name: "Hoang Van E",
    email: "vane@gmail.com",
    role: "Editor",
    avatar: "E",
    status: "Inactive",
  },
];
