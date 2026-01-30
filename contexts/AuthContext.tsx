
import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_INFO } from '@/constants/mockData';

type User = typeof USER_INFO | null;

interface AuthContextType {
    user: User;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    register: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    login: () => { },
    logout: () => { },
    register: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock loading session
    useEffect(() => {
        // Simulating checking storage
        setTimeout(() => {
            // Automatically login for development if needed, or keep logged out
            // setUser(USER_INFO); 
            setIsLoading(false);
        }, 500);
    }, []);

    const login = () => {
        setIsLoading(true);
        setTimeout(() => {
            setUser(USER_INFO);
            setIsLoading(false);
        }, 1000);
    };

    const register = () => {
        setIsLoading(true);
        setTimeout(() => {
            setUser(USER_INFO);
            setIsLoading(false);
        }, 1000);
    }

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
