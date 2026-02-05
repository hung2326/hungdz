import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Wallet, CreditCard, CheckCircle, Edit2, Ticket, X } from 'lucide-react';

export default function Checkout() {
    const { cartItems, getTotalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isSuccess, setIsSuccess] = useState(false);

    // Delivery Info State
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    // Voucher State
    const [voucherCode, setVoucherCode] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState(null);
    const [voucherError, setVoucherError] = useState('');
    const [shippingFee, setShippingFee] = useState(15000);

    // Initialize delivery info when user loads
    useEffect(() => {
        if (user) {
            setDeliveryInfo({
                name: user.name || '',
                phone: user.phone || '0909000111',
                address: user.address || '123 Đường 3/2, Quận 10, TP.HCM'
            });
        }
    }, [user]);

    // Calculate Totals
    const subtotal = getTotalPrice();

    // Discount Calculation Logic
    const calculateDiscount = () => {
        if (!appliedVoucher) return 0;

        // BOBEO: 10% off subtotal
        if (appliedVoucher.code === 'BOBEO') {
            return subtotal * 0.1;
        }

        // FREESHIP: Handled by shippingFee state, so discount amount is 0 here
        // (Visual representation handled in Summary section)
        return 0;
    };

    const discountAmount = calculateDiscount();
    const totalAmount = subtotal + shippingFee - discountAmount;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleApplyVoucher = () => {
        const code = voucherCode.trim().toUpperCase(); // Normalize to Uppercase
        setVoucherError('');

        if (code === 'FREESHIP') {
            setAppliedVoucher({ code: 'FREESHIP', description: 'Miễn phí vận chuyển' });
            setShippingFee(0);
        } else if (code === 'BOBEO') {
            setAppliedVoucher({ code: 'BOBEO', description: 'Giảm 10% đơn hàng' });
            setShippingFee(15000); // Reset shipping if switching
        } else {
            setVoucherError('Mã giảm giá không hợp lệ');
            setAppliedVoucher(null);
            setShippingFee(15000);
        }
    };

    const handleRemoveVoucher = () => {
        setAppliedVoucher(null);
        setVoucherCode('');
        setShippingFee(15000);
        setVoucherError('');
    };

    const handleOrder = () => {
        if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address) {
            alert('Vui lòng điền đầy đủ thông tin nhận hàng');
            setIsEditingAddress(true);
            return;
        }

        // Create Order Object
        const newOrder = {
            id: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            items: cartItems,
            subtotal: subtotal,
            shippingFee: shippingFee,
            discount: discountAmount,
            total: totalAmount,
            paymentMethod: paymentMethod,
            status: 'DangXuLy', // DangXuLy, DangGiao, HoanThanh
            deliveryInfo: deliveryInfo
        };

        // Save to LocalStorage
        const existingOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');
        localStorage.setItem('my_orders', JSON.stringify([newOrder, ...existingOrders]));

        setIsSuccess(true);
        setTimeout(() => {
            clearCart();
            navigate('/orders');
        }, 2000);
    };

    if (cartItems.length === 0 && !isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p>Giỏ hàng trống</p>
                <button onClick={() => navigate('/')} className="text-orange-600 font-bold hover:underline">Về trang chủ</button>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <CheckCircle size={80} className="text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h2>
                <p className="text-gray-500 text-center mb-6">Đơn hàng của bạn đang được chuẩn bị.</p>
                <p className="text-sm text-gray-400">Tự động chuyển hướng...</p>
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
                    <h1 className="text-xl font-bold text-gray-800">Thanh toán</h1>
                </div>
            </div>

            <div className="px-4 max-w-4xl mx-auto space-y-4">
                {/* Delivery Address */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <MapPin size={20} className="text-orange-600" />
                            Địa chỉ nhận hàng
                        </h3>
                        <button
                            onClick={() => setIsEditingAddress(!isEditingAddress)}
                            className="text-orange-600 text-sm font-bold hover:underline flex items-center gap-1"
                        >
                            <Edit2 size={14} />
                            {isEditingAddress ? 'Xong' : 'Thay đổi'}
                        </button>
                    </div>

                    {isEditingAddress ? (
                        <div className="space-y-3 animate-in fade-in duration-200">
                            <input
                                type="text"
                                placeholder="Tên người nhận"
                                className="w-full border rounded-lg p-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                value={deliveryInfo.name}
                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Số điện thoại"
                                className="w-full border rounded-lg p-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                value={deliveryInfo.phone}
                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                            />
                            <textarea
                                placeholder="Địa chỉ chi tiết (Số nhà, đường, quận/huyện...)"
                                className="w-full border rounded-lg p-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                rows={2}
                                value={deliveryInfo.address}
                                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div className="pl-7">
                            <p className="font-bold text-gray-800">{deliveryInfo.name || 'Chưa có tên'}</p>
                            <p className="text-gray-600 text-sm">{deliveryInfo.phone || 'Chưa có SĐT'}</p>
                            <p className="text-gray-600 text-sm">{deliveryInfo.address || 'Chưa có địa chỉ'}</p>
                        </div>
                    )}
                </div>

                {/* Items Summary */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3">Món ăn đã chọn</h3>
                    <div className="space-y-3">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-orange-600">{item.quantity}x</span>
                                    <span className="text-gray-700">{item.name}</span>
                                </div>
                                <span className="font-medium text-gray-800">{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3">Phương thức thanh toán</h3>
                    <div className="space-y-2">
                        <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-orange-600 bg-orange-50' : 'border-gray-200'}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={() => setPaymentMethod('cod')}
                                className="w-4 h-4 text-orange-600 focus:ring-orange-600"
                            />
                            <Wallet size={20} className={paymentMethod === 'cod' ? 'text-orange-600' : 'text-gray-400'} />
                            <span className="font-medium text-gray-700">Thanh toán khi nhận hàng (COD)</span>
                        </label>

                        <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'banking' ? 'border-orange-600 bg-orange-50' : 'border-gray-200'}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="banking"
                                checked={paymentMethod === 'banking'}
                                onChange={() => setPaymentMethod('banking')}
                                className="w-4 h-4 text-orange-600 focus:ring-orange-600"
                            />
                            <CreditCard size={20} className={paymentMethod === 'banking' ? 'text-orange-600' : 'text-gray-400'} />
                            <span className="font-medium text-gray-700">Chuyển khoản ngân hàng</span>
                        </label>
                    </div>
                </div>

                {/* Voucher Section */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Ticket size={20} className="text-orange-600" />
                        Mã giảm giá
                    </h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Nhập mã voucher"
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 uppercase"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            disabled={!!appliedVoucher}
                        />
                        {appliedVoucher ? (
                            <button
                                onClick={handleRemoveVoucher}
                                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition"
                            >
                                Bỏ chọn
                            </button>
                        ) : (
                            <button
                                onClick={handleApplyVoucher}
                                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition shadow-md shadow-orange-100"
                            >
                                Áp dụng
                            </button>
                        )}
                    </div>
                    {voucherError && <p className="text-red-500 text-xs mt-2 font-medium">{voucherError}</p>}

                    {appliedVoucher && (
                        <div className="mt-3 text-green-600 text-sm flex items-center gap-2 font-medium bg-green-50 p-3 rounded-lg border border-green-100">
                            <CheckCircle size={16} />
                            <div>
                                <p>Đã áp dụng: <strong>{appliedVoucher.code}</strong></p>
                                <p className="text-xs text-green-500 font-normal">{appliedVoucher.description}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Tổng tiền hàng</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Phí vận chuyển</span>
                        {shippingFee === 0 ? (
                            <span className="text-green-600 font-bold">Miễn phí (FREESHIP)</span>
                        ) : (
                            <span>{formatPrice(shippingFee)}</span>
                        )}
                    </div>

                    {/* Only show Discount row if there's a monetary discount (like BoBeo) */}
                    {discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-green-600 mb-2 font-medium">
                            <span>Giảm giá ({appliedVoucher?.code})</span>
                            <span>-{formatPrice(discountAmount)}</span>
                        </div>
                    )}

                    <div className="border-t pt-3 flex justify-between items-center mt-2">
                        <span className="font-bold text-gray-800 text-lg">Tổng thanh toán</span>
                        <span className="font-bold text-xl text-orange-600">{formatPrice(totalAmount)}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-20 md:static md:bg-transparent md:border-0 md:p-4 md:max-w-4xl md:mx-auto">
                <button
                    onClick={handleOrder}
                    className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 active:bg-orange-700 transition"
                >
                    Đặt hàng • {formatPrice(totalAmount)}
                </button>
            </div>
        </div>
    );
}
