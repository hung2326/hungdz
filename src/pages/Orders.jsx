import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, MapPin, ChevronRight, Package, CheckCircle } from 'lucide-react';

export default function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');
        setOrders(storedOrders);
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'DangXuLy': return 'text-orange-600 bg-orange-50';
            case 'DangGiao': return 'text-blue-600 bg-blue-50';
            case 'HoanThanh': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'DangXuLy': return 'Đang xử lý';
            case 'DangGiao': return 'Đang giao hàng';
            case 'HoanThanh': return 'Hoàn thành';
            default: return status;
        }
    };

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <ShoppingBag size={48} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Chưa có đơn hàng nào</h2>
                <p className="text-gray-500 mb-6">Bạn chưa đặt món ăn nào. Hãy khám phá thực đơn ngay!</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-orange-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-orange-700 transition"
                >
                    Đặt món ngay
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-24 md:pb-8">
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm mb-4">
                <h1 className="text-xl font-bold text-gray-800">Đơn hàng của bạn</h1>
            </div>

            <div className="max-w-3xl mx-auto px-4 space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        {/* Header: ID & Status */}
                        <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-3">
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">#{order.id}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <Clock size={12} />
                                    <span>{formatDate(order.date)}</span>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                            </span>
                        </div>

                        {/* Items Preview */}
                        <div className="mb-4 space-y-2">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-center">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-50" />
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-800 line-clamp-1">{item.name}</span>
                                            <span className="text-gray-500 text-xs">x{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {order.items.length > 2 && (
                                <p className="text-xs text-gray-400 text-center pt-1">+ {order.items.length - 2} món khác</p>
                            )}
                        </div>

                        {/* Total & Action */}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                            <div>
                                <p className="text-xs text-gray-500">Tổng thanh toán</p>
                                <p className="font-bold text-orange-600">{formatPrice(order.total)}</p>
                            </div>
                            <button className="text-sm font-medium text-orange-600 border border-orange-200 px-4 py-2 rounded-lg hover:bg-orange-50 transition">
                                Chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
