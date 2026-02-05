export const PRODUCTS = [
    // Best Sellers
    {
        id: 101,
        name: "Gà Rán Giòn",
        price: "45.000đ",
        oldPrice: "60.000đ",
        discount: "25%",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=60",
        rating: 4.8,
        description: "Gà rán giòn rụm với lớp vỏ vàng ươm, thịt bên trong mềm ngọt, tẩm ướp gia vị đậm đà.",
        categoryId: 1 // Burger/Fastfood
    },
    {
        id: 102,
        name: "Burger 2 Tầng",
        price: "60.000đ",
        oldPrice: "85.000đ",
        discount: "30%",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60",
        rating: 4.9,
        description: "Burger 2 tầng thịt bò nướng lửa hồng, phô mai tan chảy và rau tươi.",
        categoryId: 1 // Burger
    },
    {
        id: 103,
        name: "Mì Ý Sốt Kem",
        price: "55.000đ",
        oldPrice: "75.000đ",
        discount: "27%",
        image: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800&auto=format&fit=crop&q=60",
        rating: 4.7,
        description: "Mì Ý dai ngon hòa quyện cùng sốt kem nấm béo ngậy và thịt xông khói.",
        categoryId: 5 // Mì
    },

    // All Foods
    {
        id: 1,
        name: "Burger Bò",
        price: "50.000đ",
        oldPrice: "65.000đ",
        discount: "23%",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60",
        description: "Burger bò truyền thống với rau xà lách, cà chua và sốt đặc biệt.",
        rating: 4.5,
        categoryId: 1
    },
    {
        id: 2,
        name: "Pizza Pepperoni",
        price: "120.000đ",
        oldPrice: "150.000đ",
        discount: "20%",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=60",
        description: "Pizza đế mỏng giòn tan phủ đầy xúc xích Pepperoni và phô mai Mozzarella.",
        rating: 4.6,
        categoryId: 2
    },
    {
        id: 3,
        name: "Sushi Tươi",
        price: "80.000đ",
        oldPrice: "100.000đ",
        discount: "20%",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
        description: "Set sushi tổng hợp với các loại cá tươi ngon nhất trong ngày.",
        rating: 4.8,
        categoryId: 3
    },
    {
        id: 4,
        name: "Mì Ý Sốt Bò",
        price: "65.000đ",
        oldPrice: "80.000đ",
        discount: "18%",
        image: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800&auto=format&fit=crop&q=60",
        description: "Mì Spaghetti sốt Bolognese thịt bò bằm cà chua kinh điển.",
        rating: 4.4,
        categoryId: 5
    },
    {
        id: 5,
        name: "Salad Cá Ngừ",
        price: "55.000đ",
        oldPrice: "70.000đ",
        discount: "21%",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
        description: "Salad rau xanh giòn ngọt kết hợp với cá ngừ ngâm dầu và sốt mayonnaise.",
        rating: 4.3,
        categoryId: 6 // Making salad dessert/light for now or uncategorized
    },
    {
        id: 6,
        name: "Kem Dâu",
        price: "30.000đ",
        oldPrice: "40.000đ",
        discount: "25%",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=60",
        description: "Kem dâu tây mát lạnh, ngọt ngào, giải nhiệt mùa hè.",
        rating: 4.7,
        categoryId: 6
    },
    {
        id: 7,
        name: "Cơm Gà Hải Nam",
        price: "45.000đ",
        oldPrice: "60.000đ",
        discount: "25%",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=60",
        description: "Cơm gà dẻo thơm nấu nước luộc gà, phục vụ cùng thịt gà luộc da giòn.",
        rating: 4.5,
        categoryId: 5 // Rice/Noodle group
    },
    {
        id: 8,
        name: "Bánh Pizza Rau Củ",
        price: "110.000đ",
        oldPrice: "140.000đ",
        discount: "21%",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60",
        description: "Pizza chay với nhiều loại rau củ tươi ngon: ớt chuông, nấm, hành tây, ô liu.",
        rating: 4.2,
        categoryId: 2
    },
    {
        id: 9,
        name: "Trà Đào Cam Sả",
        price: "35.000đ",
        oldPrice: "45.000đ",
        discount: "22%",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=60",
        description: "Thức uống thanh mát kết hợp giữa trà đào, cam tươi và hương sả nồng nàn.",
        rating: 4.6,
        categoryId: 4
    },
    {
        id: 10,
        name: "Bánh Crepe Chuối",
        price: "40.000đ",
        oldPrice: "50.000đ",
        discount: "20%",
        image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&auto=format&fit=crop&q=60",
        description: "Bánh Crepe Pháp nhân chuối ngọt ngào và sốt socola.",
        rating: 4.4,
        categoryId: 6
    },
    {
        id: 11,
        name: "Súp Bí Đỏ",
        price: "35.000đ",
        oldPrice: "45.000đ",
        discount: "22%",
        image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&auto=format&fit=crop&q=60",
        description: "Súp bí đỏ kem béo ngậy, mịn màng, giàu dinh dưỡng.",
        rating: 4.5,
        categoryId: 6
    },
    {
        id: 12,
        name: "Sandwich Gà",
        price: "30.000đ",
        oldPrice: "40.000đ",
        discount: "25%",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=60",
        description: "Bánh mì sandwich kẹp thịt gà nướng, rau xà lách và cà chua.",
        rating: 4.3,
        categoryId: 1
    }
];
