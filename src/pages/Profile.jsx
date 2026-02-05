import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Edit, User, Phone, MapPin, Mail } from 'lucide-react';

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="bg-gray-50 min-h-full pb-20 p-4">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
                <div className="bg-orange-600 h-24"></div>
                <div className="px-4 pb-6 -mt-12 flex flex-col items-center">
                    <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=f97316&color=fff"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white"
                    />
                    <h1 className="text-xl font-bold text-gray-800 mt-2">{user.name}</h1>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4 mb-4">
                <h2 className="font-bold text-gray-800 border-b pb-2 mb-2">Thông tin cá nhân</h2>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <User size={16} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Họ và tên</p>
                        <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <Mail size={16} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm font-medium text-gray-700">{user.email}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <Phone size={16} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Số điện thoại</p>
                        <p className="text-sm font-medium text-gray-700">{user.phone || 'Chưa cập nhật'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <MapPin size={16} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Địa chỉ</p>
                        <p className="text-sm font-medium text-gray-700">{user.address || 'Chưa cập nhật'}</p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate('/profile/edit')}
                className="w-full flex items-center justify-center gap-2 p-3 bg-orange-600 text-white font-bold rounded-xl shadow-md active:bg-orange-700 transition-colors mb-3"
            >
                <Edit size={18} />
                Thay đổi thông tin
            </button>

            <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3 bg-white text-red-500 font-bold rounded-xl border border-red-100 active:bg-red-50 transition-colors"
            >
                <LogOut size={18} />
                Đăng xuất
            </button>
        </div>
    );
}
