import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Assuming logo path is consistent with App.jsx

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 hidden md:block">
            <div className="w-[90%] max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {/* Brand Column */}
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-orange-600">
                        <img src={logo} alt="BoBeo Logo" className="w-10 h-10" />
                        BoBeo
                    </Link>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Đặt món ngon, giao hàng siêu tốc. BoBeo mang đến trải nghiệm ẩm thực tuyệt vời ngay tại nhà của bạn.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-600 hover:text-white transition-colors">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-600 hover:text-white transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-600 hover:text-white transition-colors">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-6">Về BoBeo</h3>
                    <ul className="space-y-3 text-gray-500">
                        <li><Link to="/explore" className="hover:text-orange-600 transition-colors">Giới thiệu</Link></li>
                        <li><Link to="/explore" className="hover:text-orange-600 transition-colors">Tính năng</Link></li>
                        <li><Link to="/explore" className="hover:text-orange-600 transition-colors">Tin tức</Link></li>
                        <li><Link to="/explore" className="hover:text-orange-600 transition-colors">Tuyển dụng</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-6">Hỗ trợ</h3>
                    <ul className="space-y-3 text-gray-500">
                        <li><Link to="/explore" className="hover:text-orange-600 transition-colors">Trung tâm trợ giúp</Link></li>
                        <li><Link to="/explore" className="hover:text-orange-600 transition-colors">Chính sách bảo mật</Link></li>
                        <li><Link to="/explore" className="hover:text-orange-600 transition-colors">Điều khoản sử dụng</Link></li>
                        <li><Link to="/explore" className="hover:text-orange-600 transition-colors">Câu hỏi thường gặp</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-6">Liên hệ</h3>
                    <ul className="space-y-4 text-gray-500">
                        <li className="flex items-start gap-3">
                            <MapPin className="text-orange-600 mt-1 flex-shrink-0" size={18} />
                            <span>Tầng 5, Tòa nhà BoBeo, 123 Đường Hải Nam, Quận 1, TP.HCM</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="text-orange-600 flex-shrink-0" size={18} />
                            <span>1900 1234</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="text-orange-600 flex-shrink-0" size={18} />
                            <span>support@bobeo.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} BoBeo Food Delivery. All rights reserved.</p>
            </div>
        </footer>
    );
}
