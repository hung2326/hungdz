import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Package, CheckCircle, Clock, Phone, User, DollarSign, MessageSquare, Star } from 'lucide-react';

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(5); // Default 5 stars

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');
        const foundOrder = storedOrders.find(o => o.id === id);
        if (foundOrder) {
            setOrder(foundOrder);
            if (foundOrder.feedback) {
                setFeedback(foundOrder.feedback);
            }
            if (foundOrder.rating) {
                setRating(foundOrder.rating);
            }
        }
    }, [id]);

    const handleConfirmReceived = () => {
        if (!order) return;

        const updatedOrder = { ...order, status: 'HoanThanh' };
        setOrder(updatedOrder);

        // Update localStorage
        const storedOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');
        const updatedOrders = storedOrders.map(o => o.id === id ? updatedOrder : o);
        localStorage.setItem('my_orders', JSON.stringify(updatedOrders));

        alert('Cảm ơn bạn đã mua hàng! Đơn hàng đã được hoàn tất.');
    };

    const handleSendFeedback = () => {
        if (!feedback.trim()) return;

        const updatedOrder = {
            ...order,
            feedback: feedback,
            rating: rating,
            feedbackDate: new Date().toISOString()
        };
        setOrder(updatedOrder);

        const storedOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');
        const updatedOrders = storedOrders.map(o => o.id === id ? updatedOrder : o);
        localStorage.setItem('my_orders', JSON.stringify(updatedOrders));

        alert('Cảm ơn bạn đã gửi đánh giá!');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'DangXuLy': return { text: 'Đang xử lý', color: 'text-orange-600', bg: 'bg-orange-50', icon: Clock };
            case 'DangGiao': return { text: 'Đang giao hàng', color: 'text-blue-600', bg: 'bg-blue-50', icon: Package };
            case 'HoanThanh': return { text: 'Hoàn thành', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
            default: return { text: status, color: 'text-gray-600', bg: 'bg-gray-50', icon: Clock };
        }
    };

    if (!order) {
        return <div className="p-8 text-center">Đang tải thông tin đơn hàng...</div>;
    }

    const StatusIcon = getStatusInfo(order.status).icon;

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm mb-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Chi tiết đơn hàng</h1>
                </div>
            </div>

            <div className="px-4 max-w-4xl mx-auto space-y-4">
                {/* Status Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3 ${getStatusInfo(order.status).bg}`}>
                        <StatusIcon size={32} className={getStatusInfo(order.status).color} />
                    </div>
                    <h2 className={`text-xl font-bold mb-1 ${getStatusInfo(order.status).color}`}>
                        {getStatusInfo(order.status).text}
                    </h2>
                    <p className="text-gray-500 text-sm">Mã đơn: {order.id}</p>
                    <p className="text-gray-400 text-xs mt-1">{formatDate(order.date)}</p>
                </div>

                {/* Confirm Button - Only Show if not completed */}
                {order.status !== 'HoanThanh' && (
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <p className="text-sm text-gray-500 mb-3 text-center">
                            Đã nhận được hàng? Hãy xác nhận để hoàn tất đơn hàng.
                        </p>
                        <button
                            onClick={handleConfirmReceived}
                            className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-200"
                        >
                            Đã nhận được hàng
                        </button>
                    </div>
                )}

                {/* Feedback Section - Only Show if completed */}
                {order.status === 'HoanThanh' && (
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <MessageSquare size={20} className="text-orange-600" />
                            Đánh giá & Phản hồi
                        </h3>

                        {order.feedback ? (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                {/* Rating Display */}
                                <div className="flex gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={16}
                                            className={star <= (order.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 text-sm">{order.feedback}</p>
                                <p className="text-xs text-gray-400 mt-2 text-right">{formatDate(order.feedbackDate)}</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {/* Rating Input */}
                                <div className="flex justify-center gap-2 py-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transform hover:scale-110 transition"
                                        >
                                            <Star
                                                size={32}
                                                className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <textarea
                                    className="w-full border rounded-lg p-3 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                    rows={3}
                                    placeholder="Bạn cảm thấy món ăn thế nào? Hãy chia sẻ với chúng tôi nhé..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                />
                                <button
                                    onClick={handleSendFeedback}
                                    className="w-full bg-orange-600 text-white font-bold py-2 rounded-lg hover:bg-orange-700 transition"
                                >
                                    Gửi đánh giá
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Delivery Info */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <MapPin size={20} className="text-orange-600" />
                        Địa chỉ nhận hàng
                    </h3>
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <User size={16} className="text-gray-400 mt-1" />
                            <span className="text-gray-800 font-medium">{order.deliveryInfo?.name}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone size={16} className="text-gray-400 mt-1" />
                            <span className="text-gray-600">{order.deliveryInfo?.phone}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin size={16} className="text-gray-400 mt-1" />
                            <span className="text-gray-600">{order.deliveryInfo?.address}</span>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3">Sản phẩm </h3>
                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-50" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium text-gray-800 line-clamp-2">{item.name}</span>
                                        <span className="font-bold text-gray-800 text-sm">{item.price}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded">x{item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Tạm tính</span>
                        <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Phí vận chuyển</span>
                        <span>{formatPrice(order.shippingFee)}</span>
                    </div>
                    {order.discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span>Giảm giá</span>
                            <span>-{formatPrice(order.discount)}</span>
                        </div>
                    )}
                    <div className="border-t pt-3 flex justify-between items-center mt-2">
                        <span className="font-bold text-gray-800">Tổng cộng</span>
                        <span className="font-bold text-xl text-orange-600">{formatPrice(order.total)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Phương thức thanh toán</span>
                        <span className="uppercase">{order.paymentMethod}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
