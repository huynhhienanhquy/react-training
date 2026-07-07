export type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
  score: number;
  status: "Active" | "Inactive";
};

export const students: Student[] = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    email: "minhanh@gmail.com",
    course: "React Foundation",
    score: 8.7,
    status: "Active",
  },
  {
    id: 2,
    name: "Trần Quốc Bảo",
    email: "quocbao@gmail.com",
    course: "TypeScript Mastery",
    score: 7.9,
    status: "Active",
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    email: "hoangnam@gmail.com",
    course: "UI System",
    score: 6.8,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Phạm Linh Chi",
    email: "linhchi@gmail.com",
    course: "React Foundation",
    score: 9.2,
    status: "Active",
  },
];
