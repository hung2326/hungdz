import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function ProfileEdit() {
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        navigate('/profile');
    };

    return (
        <div className="bg-gray-50 min-h-full pb-20">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
                <button onClick={() => navigate('/profile')} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Chỉnh sửa hồ sơ</h1>
            </div>

            <div className="p-4">
                <div className="flex justify-center mb-8 mt-4">
                    <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=f97316&color=fff"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Họ và tên</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
                        <input
                            type="tel"
                            name="phone"
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Địa chỉ giao hàng</label>
                        <input
                            type="text"
                            name="address"
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition shadow-orange-200 shadow-lg"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
