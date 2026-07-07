export type GymClass = {
  id: number;
  name: string;
  level: string;
  duration: string;
  description: string;
};

export const classes: GymClass[] = [
  {
    id: 1,
    name: "Morning Yoga",
    level: "Beginner",
    duration: "45 phút",
    description: "Tăng độ dẻo dai, giảm stress và cải thiện hơi thở.",
  },
  {
    id: 2,
    name: "HIIT Burn",
    level: "Advanced",
    duration: "30 phút",
    description: "Bài tập cường độ cao giúp đốt calories nhanh.",
  },
  {
    id: 3,
    name: "Strength Training",
    level: "Intermediate",
    duration: "60 phút",
    description: "Tập trung vào sức mạnh, cơ bắp và kỹ thuật nâng tạ.",
  },
];
