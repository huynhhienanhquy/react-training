export type Course = {
  id: number;
  title: string;
  level: string;
  description: string;
  price: string;
};

export const courses: Course[] = [
  {
    id: 1,
    title: "React Foundation",
    level: "Beginner",
    description: "Học component, props, state và cách tổ chức project React.",
    price: "499k",
  },
  {
    id: 2,
    title: "TypeScript Mastery",
    level: "Intermediate",
    description: "Nắm vững type, interface, generic và typing trong React.",
    price: "699k",
  },
  {
    id: 3,
    title: "Frontend UI System",
    level: "Advanced",
    description: "Xây dựng UI chuyên nghiệp với Chakra UI và design system.",
    price: "899k",
  },
];
