export type Activity = {
  id: number;
  title: string;
  time: string;
};

export const activities: Activity[] = [
  {
    id: 1,
    title: "Minh Anh hoàn thành bài React State",
    time: "10 phút trước",
  },
  {
    id: 2,
    title: "Quốc Bảo đăng ký khóa TypeScript",
    time: "35 phút trước",
  },
  {
    id: 3,
    title: "Linh Chi đạt điểm 9.2 ở bài kiểm tra",
    time: "1 giờ trước",
  },
];
