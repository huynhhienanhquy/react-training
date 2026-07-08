export type EventStatus = "Open" | "Full" | "Closed"

export type EventItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  participants: number;
  capacity: number;
  status: EventStatus;
}

export const events: EventItem[] = [
  {
    id: 1,
    title: "React Meetup 2026",
    category: "Tech",
    date: "12 Aug 2026",
    location: "Ho Chi Minh City",
    participants: 120,
    capacity: 200,
    status: "Open",
  },
  {
    id: 2,
    title: "UI Design Workshop",
    category: "Design",
    date: "20 Aug 2026",
    location: "Da Nang",
    participants: 80,
    capacity: 80,
    status: "Full",
  },
  {
    id: 3,
    title: "Startup Networking",
    category: "Business",
    date: "05 Sep 2026",
    location: "Ha Noi",
    participants: 45,
    capacity: 100,
    status: "Open",
  },
  {
    id: 4,
    title: "Frontend Bootcamp",
    category: "Education",
    date: "18 Sep 2026",
    location: "Online",
    participants: 150,
    capacity: 150,
    status: "Closed",
  },
]
