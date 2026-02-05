import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();
    const { register, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const { name, email, password, confirmPassword, phone, address } = formData;

        if (!name || !email || !password || !phone || !address) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        const phoneRegex = /^[0-9]{10,}$/;
        if (!phoneRegex.test(phone)) {
            setError('Số điện thoại phải có ít nhất 10 số');
            return;
        }

        const result = await register(name, email, password, phone, address);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-2xl font-bold text-orange-600">Tạo tài khoản</h1>
                    <p className="text-gray-500 text-sm">Đăng ký để bắt đầu trải nghiệm</p>
                </div>

                <div className="w-full">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Họ và tên</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-orange-500"
                                placeholder="Nguyễn Văn A"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-orange-500"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-orange-500"
                                placeholder="0912345678"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-orange-500"
                                placeholder="123 Đường ABC, Quận X"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Mật khẩu</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-orange-500 pr-10"
                                        placeholder="******"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Xác nhận</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-orange-500 pr-10"
                                        placeholder="******"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition disabled:opacity-70 mt-6"
                        >
                            {isLoading ? 'Đang xử lý...' : 'ĐĂNG KÝ'}
                        </button>
                    </form>

                    <div className="flex justify-center mt-6 gap-2">
                        <span className="text-gray-500">Đã có tài khoản?</span>
                        <Link to="/login" className="text-orange-600 font-bold hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
