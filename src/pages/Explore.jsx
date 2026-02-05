import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const CATEGORIES = [
    { id: 1, name: 'Burger', icon: '🍔' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Sushi', icon: '🍣' },
    { id: 4, name: 'Đồ uống', icon: '🥤' },
    { id: 5, name: 'Mì', icon: '🍜' },
    { id: 6, name: 'Tráng miệng', icon: '🍰' },
];

export default function Explore() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = PRODUCTS.filter(p => {
        const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-gray-50 min-h-full pb-20 relative">
            <div className="bg-white p-4 sticky top-0 z-20 shadow-sm space-y-3">
                <h1 className="text-2xl font-bold text-gray-800">Khám phá</h1>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Tìm món ăn yêu thích..."
                        className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all outline-none font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="p-4 space-y-6">
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

                {/* Food Grid */}
                <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-4">
                        {selectedCategory
                            ? `Món ngon: ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`
                            : 'Món ngon dành cho bạn'}
                    </h3>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredProducts.map(item => (
                                <Link to={`/product/${item.id}`} key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                                    <div className="h-36 overflow-hidden relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        {item.discount && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                                -{item.discount}
                                            </div>
                                        )}
                                        <button className="absolute bottom-2 right-2 bg-white text-orange-600 w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform pointer-events-none">
                                            <Plus size={18} strokeWidth={3} />
                                        </button>
                                    </div>
                                    <div className="p-3 bg-white flex flex-col gap-1">
                                        <h4 className="font-bold text-gray-800 text-sm truncate mb-1">{item.name}</h4>
                                        <div className="flex flex-col">
                                            {item.oldPrice && <span className="text-gray-400 text-xs line-through">{item.oldPrice}</span>}
                                            <div className="flex items-center justify-between">
                                                <span className="text-orange-600 font-bold text-lg">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>Không tìm thấy món ăn nào phù hợp.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
