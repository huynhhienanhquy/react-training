export type Course = {
  id: number;
  name: string;
  students: number;
  progress: number;
};

export const courses: Course[] = [
  {
    id: 1,
    name: "React Foundation",
    students: 42,
    progress: 80,
  },
  {
    id: 2,
    name: "TypeScript Mastery",
    students: 35,
    progress: 65,
  },
  {
    id: 3,
    name: "Frontend UI System",
    students: 28,
    progress: 72,
  },
];
