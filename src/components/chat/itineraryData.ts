export interface ActivityItem {
  id: string;
  time: string;
  title: string;
  location: string;
}

export interface DayItinerary {
  day: number;
  dateTitle: string;
  activities: ActivityItem[];
}

export const DEFAULT_ITINERARY: DayItinerary[] = [
  {
    day: 1,
    dateTitle: 'Ngày 1: Khám phá Trung tâm Đà Nẵng',
    activities: [
      {
        id: 'a1',
        time: '08:30 AM',
        title: 'Thưởng thức Mỳ Quảng Bích',
        location: '1-5 Đặng Dung, Liên Chiểu',
      },
      {
        id: 'a2',
        time: '10:00 AM',
        title: 'Check-in Bảo Tàng Chăm',
        location: 'Số 2 2 Tháng 9, Bình Hiên, Hải Châu',
      },
      {
        id: 'a3',
        time: '03:30 PM',
        title: 'Tắm biển & Dạo Bãi Biển Mỹ Khê',
        location: 'Võ Nguyên Giáp, Sơn Trà',
      },
      {
        id: 'a4',
        time: '07:00 PM',
        title: 'Ngắm Cầu Rồng phun lửa & nước',
        location: 'Cầu Rồng, Phước Ninh, Hải Châu',
      },
    ],
  },
  {
    day: 2,
    dateTitle: 'Ngày 2: Chinh phục Bà Nà Hills',
    activities: [
      {
        id: 'a5',
        time: '08:00 AM',
        title: 'Khởi hành đi Bà Nà Hills',
        location: 'Hòa Vang, Đà Nẵng',
      },
      {
        id: 'a6',
        time: '09:30 AM',
        title: 'Sống ảo tại Cầu Vàng (Golden Bridge)',
        location: 'Khu du lịch Sun World Bà Nà Hills',
      },
    ],
  },
];
