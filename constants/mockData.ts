
export const USER_INFO = {
  name: 'Lê Vạn Trường Sơn',
  avatar: 'https://i.pravatar.cc/150?img=68',
  phone: '0909000111',
  address: '123 Đường Số 1, Quận 1, TP.HCM',
};

export const BANNERS = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
];

export const PRODUCTS = [
  {
    id: '1',
    name: 'Phở Bò Đặc Biệt',
    description: 'Phở bò tái nạm gầu, nước dùng hầm xương 24h, hương vị gia truyền.',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Bún Chả Hà Nội',
    description: 'Bún chả thịt nướng than hoa, nem rán giòn tan, nước chấm chua ngọt.',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Cơm Tấm Sườn Bì',
    description: 'Cơm tấm hạt vỡ, sườn cốt lết nướng mật ong, bì thính, chả trứng.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1533630654593-b26a19f2c69e?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    rating: 4.5,
  },
  {
    id: '4',
    name: 'Bánh Mì Thập Cẩm',
    description: 'Bánh mì pate, thịt nguội, chả lụa, dưa leo, ngò rí, sốt bơ trứng.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1509722747741-092078b55909?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Gỏi Cuốn Tôm Thịt',
    description: 'Gỏi cuốn tôm tươi, thịt ba chỉ, bún, rau sống, chấm mắm nêm hoặc tương đen.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1548548239-cab2243d6118?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Hamburger Bò',
    description: 'Bánh mì tròn, thịt bò nướng, phô mai, rau xà lách, cà chua.',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    rating: 4.5,
  },
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-001',
    items: [PRODUCTS[0], PRODUCTS[3]],
    total: 90000,
    status: 'Delivered', // Delivering, Delivered
    date: '2023-10-25',
    address: '123 Đường Số 1, Quận 1, TP.HCM',
  },
];
