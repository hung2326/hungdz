
import { USER_INFO } from '@/constants/mockData';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = typeof USER_INFO | null;

interface AuthContextType {
    user: User;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    register: (name: string, email: string, password: string, phone: string, address: string) => Promise<{ success: boolean; message?: string }>;
    updateProfile: (data: Partial<NonNullable<User>>) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    login: async () => ({ success: false }),
    logout: () => { },
    register: async () => ({ success: false }),
    updateProfile: (data) => { },
});

export const useAuth = () => useContext(AuthContext);

export const API_URL = 'http://10.0.2.2:3000/api/auth'; // Use 10.0.2.2 for Android Emulator, localhost for iOS Simulator

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        console.log("DEBUG: AuthContext - checking user logged in");
        // Here we should check AsyncStorage for token and validate it
        // For simplicity in this demo, we'll start logged out or check a local flag
        setIsLoading(false);
        console.log("DEBUG: AuthContext - isLoading set to false");
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Đăng nhập thất bại');
            }

            setUser(data.user);
            // Save token to storage here
            return { success: true };
        } catch (error: any) {
            console.error(error);
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string, phone: string, address: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, phone, address }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Đăng ký thất bại');
            }

            setUser(data.user);
            // Save token to storage here
            return { success: true };
        } catch (error: any) {
            console.error(error);
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    }

    const updateProfile = (data: Partial<NonNullable<User>>) => {
        if (!user) return;
        setUser({ ...user, ...data });
    };

    const logout = () => {
        setUser(null);
        // Clear token from storage
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
