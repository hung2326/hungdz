import React, { useState, useEffect } from 'react';
import { Search, MapPin, X, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

const BANNER_ITEMS = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60",
        name: "Double Cheese Burger",
        description: "Thịt bò nướng thơm lừng với 2 lớp phô mai béo ngậy."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60",
        name: "Pizza Hải Sản",
        description: "Tôm, mực tươi ngon trên nền sốt cà chua đặc biệt."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
        name: "Combo Sushi",
        description: "Thưởng thức hương vị Nhật Bản đích thực."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=60",
        name: "Đồ Uống Mùa Hè",
        description: "Giải nhiệt với các loại nước ép trái cây tươi mát."
    }
];

const CATEGORIES = [
    { id: 1, name: 'Burger', icon: '🍔' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Sushi', icon: '🍣' },
    { id: 4, name: 'Đồ uống', icon: '🥤' },
    { id: 5, name: 'Mì', icon: '🍜' },
    { id: 6, name: 'Tráng miệng', icon: '🍰' },
];

export default function Home() {
    const [currentLocation, setCurrentLocation] = useState('Vị trí hiện tại');
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [tempLocation, setTempLocation] = useState('');
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Filter Logic
    const filterProducts = (products) => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    };

    // Filter Best Sellers (items with IDs >= 100 in our mock data)
    const bestSellers = filterProducts(PRODUCTS.filter(p => p.id >= 100));
    // Filter Regular Foods (items with IDs < 100)
    const allFoods = filterProducts(PRODUCTS.filter(p => p.id < 100));

    // Auto scroll banner
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % BANNER_ITEMS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleUpdateLocation = (e) => {
        e.preventDefault();
        if (tempLocation.trim()) {
            setCurrentLocation(tempLocation);
            setIsLocationModalOpen(false);
            setTempLocation('');
        }
    };

    return (
        <div className="bg-gray-50 min-h-full pb-20 relative">
            {/* Location Header & Search */}
            <div className="bg-white p-4 sticky top-0 z-20 shadow-sm space-y-3">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-gray-500 text-xs mb-1">Giao đến</p>
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => setIsLocationModalOpen(true)}
                        >
                            <MapPin className="text-orange-600" size={20} />
                            <h2 className="text-orange-600 font-bold text-lg group-hover:underline truncate max-w-[200px]">
                                {currentLocation}
                            </h2>
                            <span className="text-orange-600 text-xs">▼</span>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative z-30">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Bạn đang thèm gì?..."
                        className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all outline-none placeholder:text-gray-400 font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Search Dropdown */}
                    {searchQuery.trim() !== '' && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto">
                            {PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                                PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
                                    <Link
                                        to={`/product/${product.id}`}
                                        key={product.id}
                                        className="flex items-center gap-3 p-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                                        onClick={() => setSearchQuery('')} // Clear search on click
                                    >
                                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-gray-800">{product.name}</h4>
                                            <p className="text-xs text-orange-600 font-bold">{product.price}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500 text-sm">
                                    Không tìm thấy món ăn nào
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-4 space-y-6">

                {/* Banner Carousel */}
                <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-md group">
                    <div
                        className="flex transition-transform duration-500 ease-out h-full"
                        style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
                    >
                        {BANNER_ITEMS.map((item) => (
                            <div key={item.id} className="w-full h-full flex-shrink-0 relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                {/* Text Overlay */}
                                <div className="absolute bottom-4 left-4 text-white max-w-[80%]">
                                    <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                                    <p className="text-xs text-gray-200 line-clamp-2">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Dots indicator */}
                    <div className="absolute bottom-2 right-4 flex gap-1">
                        {BANNER_ITEMS.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-colors ${currentBannerIndex === idx ? 'bg-white' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Best Sellers */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-xl text-gray-800">Best Seller 🔥</h3>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                        {bestSellers.map(item => (
                            <Link to={`/product/${item.id}`} key={item.id} className="min-w-[160px] bg-white rounded-xl shadow-sm overflow-hidden flex-shrink-0 mx-1 flex flex-col justify-between">
                                <div className="h-28 overflow-hidden relative">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">
                                        -{item.discount}
                                    </div>
                                    <div className="absolute top-2 right-2 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-orange-600">
                                        ⭐ {item.rating}
                                    </div>
                                </div>
                                <div className="p-3 flex flex-col gap-1">
                                    <h4 className="font-bold text-gray-800 text-sm truncate mb-1">{item.name}</h4>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs line-through">{item.oldPrice}</span>
                                        <span className="text-orange-600 font-bold block">{item.price}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-xl text-gray-800">Danh mục</h3>
                        {selectedCategory && (
                            <button onClick={() => setSelectedCategory(null)} className="text-orange-600 text-sm font-medium hover:underline">
                                Xóa bộ lọc
                            </button>
                        )}
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {CATEGORIES.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => setSelectedCategory(prev => prev === cat.id ? null : cat.id)}
                                className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group"
                            >
                                <div className={`w-16 h-16 rounded-full shadow-sm flex items-center justify-center text-3xl border transition-all ${selectedCategory === cat.id
                                        ? 'bg-orange-600 border-orange-600 text-white shadow-orange-200 shadow-lg scale-110'
                                        : 'bg-white border-gray-100 group-hover:border-orange-200 group-hover:bg-orange-50'
                                    }`}>
                                    {cat.icon}
                                </div>
                                <span className={`text-xs font-medium transition-colors ${selectedCategory === cat.id ? 'text-orange-600 font-bold' : 'text-gray-600 group-hover:text-orange-600'
                                    }`}>
                                    {cat.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Food List */}
                <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-4">Món ngon dành cho bạn</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {allFoods.map(item => (
                            <Link to={`/product/${item.id}`} key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                                <div className="h-36 overflow-hidden relative">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                        -{item.discount}
                                    </div>
                                    <button className="absolute bottom-2 right-2 bg-white text-orange-600 w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform pointer-events-none">
                                        <Plus size={18} strokeWidth={3} />
                                    </button>
                                </div>
                                <div className="p-3 bg-white flex flex-col gap-1">
                                    <h4 className="font-bold text-gray-800 text-sm truncate mb-1">{item.name}</h4>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs line-through">{item.oldPrice}</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-orange-600 font-bold text-lg">{item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Location Modal */}
            {isLocationModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Chọn vị trí giao hàng</h3>
                            <button onClick={() => setIsLocationModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateLocation} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Nhập địa chỉ mới</label>
                                <input
                                    type="text"
                                    placeholder="Ví dụ: 123 Đường ABC..."
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-orange-500 font-medium"
                                    value={tempLocation}
                                    onChange={(e) => setTempLocation(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-200"
                            >
                                Xác nhận
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
