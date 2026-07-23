export interface PlaceItem {
  id: string;
  name: string;
  category: 'food' | 'sightseeing' | 'entertainment' | 'shopping';
  rating: number;
  address: string;
  image: string;
  description: string;
}

export const DEFAULT_PLACES: PlaceItem[] = [
  {
    id: 'p1',
    name: 'Bà Nà Hills & Cầu Vàng',
    category: 'sightseeing',
    rating: 4.8,
    address: 'Thôn An Sơn, Hòa Vang, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=400',
    description: 'Khu du lịch sinh thái kết hợp nghỉ dưỡng đỉnh cao trên núi.',
  },
  {
    id: 'p2',
    name: 'Nhà Hàng Hải Sản Bé Mặn',
    category: 'food',
    rating: 4.5,
    address: 'Lô 11 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400',
    description: 'Hải sản tươi sống chế biến theo phong cách địa phương.',
  },
  {
    id: 'p3',
    name: 'Chợ Đêm Sơn Trà',
    category: 'shopping',
    rating: 4.4,
    address: 'Mai Hắc Đế, An Hải Trung, Sơn Trà, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=400',
    description: 'Thiên đường quà lưu niệm và ẩm thực đường phố sầm uất.',
  },
  {
    id: 'p4',
    name: 'Công Viên Châu Á (Asia Park)',
    category: 'entertainment',
    rating: 4.6,
    address: '1 Phan Đăng Lưu, Hòa Cường Bắc, Hải Châu, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=400',
    description: 'Khu vui chơi giải trí ngoài trời với vòng quay Sun Wheel rực rỡ.',
  },
];
