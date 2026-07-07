export type Trainer = {
  id: number;
  name: string;
  specialty: string;
  experience: string;
};

export const trainers: Trainer[] = [
  {
    id: 1,
    name: "Minh Anh",
    specialty: "Yoga & Mobility",
    experience: "5 năm kinh nghiệm",
  },
  {
    id: 2,
    name: "Quốc Bảo",
    specialty: "Strength Training",
    experience: "7 năm kinh nghiệm",
  },
  {
    id: 3,
    name: "Linh Chi",
    specialty: "HIIT & Fat Loss",
    experience: "4 năm kinh nghiệm",
  },
];
