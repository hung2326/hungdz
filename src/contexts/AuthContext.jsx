import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage", e);
            }
        }
        setIsLoading(false);
    };

    const login = async (email, password) => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const users = JSON.parse(localStorage.getItem('users_db') || '[]');
            const foundUser = users.find(u => u.email === email && u.password === password);

            if (foundUser) {
                const userSession = { ...foundUser };
                delete userSession.password; // Don't keep password in session

                setUser(userSession);
                localStorage.setItem('currentUser', JSON.stringify(userSession));
                return { success: true };
            } else {
                return { success: false, message: 'Email hoặc mật khẩu không đúng' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Đã có lỗi xảy ra' };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name, email, password, phone, address) => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const users = JSON.parse(localStorage.getItem('users_db') || '[]');

            // Check if email exists
            if (users.some(u => u.email === email)) {
                return { success: false, message: 'Email này đã được sử dụng' };
            }

            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password,
                phone,
                address,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff`
            };

            users.push(newUser);
            localStorage.setItem('users_db', JSON.stringify(users));

            const userSession = { ...newUser };
            delete userSession.password;

            setUser(userSession);
            localStorage.setItem('currentUser', JSON.stringify(userSession));
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Đăng ký thất bại' };
        } finally {
            setIsLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateProfile = (data) => {
        if (!user) return;
        const updatedUser = { ...user, ...data };

        // Update in session
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Update in database
        const users = JSON.parse(localStorage.getItem('users_db') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...data };
            localStorage.setItem('users_db', JSON.stringify(users));
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
