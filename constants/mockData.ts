
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

export const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Phở Bò Đặc Biệt',
    description: 'Phở bò tái nạm gầu, nước dùng hầm xương 24h, hương vị gia truyền.',
    price: 65000,
    image: 'https://loremflickr.com/800/600/pho,beef',
    isBestSeller: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Bún Chả Hà Nội',
    description: 'Bún chả thịt nướng than hoa, nem rán giòn tan, nước chấm chua ngọt.',
    price: 55000,
    image: 'https://loremflickr.com/800/600/grilled,pork,noodle',
    isBestSeller: true,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Cơm Tấm Sườn Bì',
    description: 'Cơm tấm hạt vỡ, sườn cốt lết nướng mật ong, bì thính, chả trứng.',
    price: 50000,
    image: 'https://loremflickr.com/800/600/comtam,rice',
    isBestSeller: false,
    rating: 4.5,
  },
  {
    id: '4',
    name: 'Bánh Mì Thập Cẩm',
    description: 'Bánh mì pate, thịt nguội, chả lụa, dưa leo, ngò rí, sốt bơ trứng.',
    price: 25000,
    image: 'https://loremflickr.com/800/600/banhmi,sandwich',
    isBestSeller: false,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Gỏi Cuốn Tôm Thịt',
    description: 'Gỏi cuốn tôm tươi, thịt ba chỉ, bún, rau sống, chấm mắm nêm hoặc tương đen.',
    price: 15000,
    image: 'https://loremflickr.com/800/600/springroll',
    isBestSeller: false,
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Hamburger Bò',
    description: 'Bánh mì tròn, thịt bò nướng, phô mai, rau xà lách, cà chua.',
    price: 75000,
    image: 'https://loremflickr.com/800/600/hamburger',
    isBestSeller: true,
    rating: 4.5,
  },
];

const EXTRA_PRODUCTS = [
  {
    id: '7',
    name: 'Bún Bò Huế',
    description: 'Bún bò gốc Huế, giò heo, chả cua, huyết, nước dùng cay nồng đặc trưng.',
    price: 60000,
    image: 'https://loremflickr.com/800/600/bunbohue,soup',
    isBestSeller: true,
    rating: 4.8,
  },
  {
    id: '8',
    name: 'Mì Quảng',
    description: 'Mì Quảng tôm thịt, trứng cút, bánh đa, rau sống, nước lèo đậm đà.',
    price: 55000,
    image: 'https://loremflickr.com/800/600/miquang,noodle',
    isBestSeller: false,
    rating: 4.6,
  },
  {
    id: '9',
    name: 'Bánh Xèo Miền Tây',
    description: 'Bánh xèo vỏ giòn rụm, nhân tôm thịt giá đỗ, cuốn rau rừng chấm nước mắm.',
    price: 45000,
    image: 'https://loremflickr.com/800/600/banhxeo,pancake',
    isBestSeller: false,
    rating: 4.7,
  },
  {
    id: '10',
    name: 'Cơm Gà Hải Nam',
    description: 'Cơm gà luộc da giòn, cơm nấu nước luộc gà vàng ươm, nước chấm gừng tỏi.',
    price: 55000,
    image: 'https://loremflickr.com/800/600/chickenrice',
    isBestSeller: false,
    rating: 4.5,
  },
  {
    id: '11',
    name: 'Bún Đậu Mắm Tôm',
    description: 'Mẹt bún đậu đầy đủ: đậu rán, chả cốm, nem chua rán, thịt luộc, mắm tôm pha ngon.',
    price: 110000,
    image: 'https://loremflickr.com/800/600/tofu,food',
    isBestSeller: true,
    rating: 4.9,
  },
  {
    id: '12',
    name: 'Trà Sữa Trân Châu',
    description: 'Trà sữa truyền thống, trân châu đường đen, topping kem cheese béo ngậy.',
    price: 35000,
    image: 'https://loremflickr.com/800/600/milktea,boba',
    isBestSeller: true,
    rating: 4.8,
  },
];

export const PRODUCTS = [...INITIAL_PRODUCTS, ...EXTRA_PRODUCTS];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-001',
    items: [PRODUCTS[0], PRODUCTS[3]],
    total: 90000,
    status: 'Delivered', // Delivering, Delivered
    date: '2023-10-25',
    address: '123 Đường Số 1, Quận 1, TP.HCM',
    customerName: 'Lê Vạn Trường Sơn',
    customerPhone: '0909000111',
  },
];
