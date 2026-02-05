import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message || 'Vui lòng thử lại');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={logo}
                        alt="BoBeo Logo"
                        className="w-24 h-24 mb-4"
                    />
                    <h1 className="text-2xl font-bold text-orange-600">BoBeo</h1>
                </div>

                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Đăng Nhập</h2>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Email / Số điện thoại</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-orange-500"
                                placeholder="Nhập email hoặc SĐT"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full border border-gray-300 rounded p-3 text-base focus:outline-none focus:border-orange-500 pr-12"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition disabled:opacity-70"
                        >
                            {isLoading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
                        </button>
                    </form>

                    <div className="flex justify-center mt-6 gap-2">
                        <span className="text-gray-500">Chưa có tài khoản?</span>
                        <Link to="/register" className="text-orange-600 font-bold hover:underline">
                            Đăng ký ngay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
