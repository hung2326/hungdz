import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Star, Clock, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../contexts/CartContext';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const product = PRODUCTS.find(p => p.id == id);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm</p>
                <button
                    onClick={() => navigate('/')}
                    className="text-orange-600 font-bold hover:underline"
                >
                    Quay lại trang chủ
                </button>
            </div>
        );
    }

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    return (
        <div className="bg-white min-h-screen pb-20 md:pb-0 relative">
            {/* Header / Back Button */}
            <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent md:bg-none md:p-6 md:from-transparent">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md md:bg-gray-100 flex items-center justify-center text-white md:text-gray-700 hover:bg-white/30 md:hover:bg-gray-200 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>

            {/* Product Image */}
            <div className="h-[40vh] md:h-[50vh] w-full relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Container - Overlapping style for mobile */}
            <div className="bg-white rounded-t-3xl -mt-6 relative px-6 pt-8 pb-32 md:mt-0 md:rounded-none md:p-8">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex-1 mr-4">{product.name}</h1>
                    <span className="text-2xl md:text-3xl font-bold text-orange-600">{product.price}</span>
                </div>

                {/* Rating & Meta */}
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg text-orange-600 font-bold">
                        <Star size={16} fill="currentColor" />
                        <span>{product.rating || '4.5'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>15-20 phút</span>
                    </div>
                    <span>•</span>
                    <span>150+ đã bán</span>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">Mô tả</h3>
                    <p className="text-gray-500 leading-relaxed">
                        {product.description || `Thưởng thức hương vị tuyệt vời của ${product.name}. Được chế biến từ những nguyên liệu tươi ngon nhất, món ăn này chắc chắn sẽ làm hài lòng vị giác của bạn. Một lựa chọn hoàn hảo cho bữa ăn hôm nay!`}
                    </p>
                </div>

                {/* Desktop Layout split for actions */}
                <div className="md:flex md:items-center md:gap-8 md:border-t md:pt-8">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-8 md:mb-0">
                        <span className="font-bold text-gray-800 md:hidden">Số lượng</span>
                        <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 ml-auto md:ml-0 border border-gray-100">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 active:scale-95 transition-transform disabled:opacity-50"
                                disabled={quantity <= 1}
                            >
                                <Minus size={18} />
                            </button>
                            <span className="font-bold text-lg min-w-[20px] text-center">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="w-8 h-8 rounded-full bg-orange-600 shadow-sm flex items-center justify-center text-white active:scale-95 transition-transform"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full md:w-auto md:flex-1 bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 active:bg-orange-700 transition-colors"
                    >
                        <ShoppingBag size={20} />
                        Thêm vào giỏ - {quantity * parseInt(product.price.replace(/\D/g, '')) / 1000}.000đ
                    </button>
                </div>
            </div>
        </div>
    );
}
