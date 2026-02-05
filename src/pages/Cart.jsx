import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                <div className="bg-orange-50 p-6 rounded-full mb-4">
                    <ShoppingBag size={48} className="text-orange-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
                <p className="text-gray-500 mb-6 text-center">Bạn chưa thêm món ăn nào vào giỏ hàng.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-orange-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-orange-700 transition"
                >
                    Khám phá món ăn
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm mb-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
                </div>
            </div>

            <div className="px-4 max-w-4xl mx-auto">
                <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-800 line-clamp-2">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 p-1"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-orange-600 font-bold text-sm">{item.price}</p>
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:bg-gray-200"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="font-medium w-6 text-center text-sm">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 active:bg-orange-200"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bill Summary */}
                <div className="bg-white p-5 rounded-xl shadow-sm space-y-3 mb-6">
                    <h3 className="font-bold text-gray-800 mb-2">Chi tiết thanh toán</h3>

                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Tổng tiền hàng</span>
                        <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Phí vận chuyển</span>
                        <span>15.000 đ</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                        <span className="font-bold text-gray-800">Tổng thanh toán</span>
                        <span className="font-bold text-xl text-orange-600">{formatPrice(getTotalPrice() + 15000)}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Floating Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-20 md:static md:bg-transparent md:border-0 md:p-4 md:max-w-4xl md:mx-auto">
                <button
                    onClick={() => navigate('/checkout')} // In real flow, verify auth first
                    className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 active:bg-orange-700 transition"
                >
                    Đặt hàng ({cartItems.length} món)
                </button>
            </div>
        </div>
    );
}
