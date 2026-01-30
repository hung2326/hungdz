
import React, { createContext, useContext, useState } from 'react';
import { INITIAL_ORDERS } from '@/constants/mockData';

export type OrderStatus = 'Delivering' | 'Delivered' | 'Cancelled';

export interface OrderItem {
    id: string;
    items: any[];
    total: number;
    status: OrderStatus;
    date: string;
    address: string;
}

interface OrderContextType {
    orders: OrderItem[];
    addOrder: (order: OrderItem) => void;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType>({
    orders: [],
    addOrder: () => { },
    updateOrderStatus: () => { },
    cancelOrder: () => { },
});

export const useOrders = () => useContext(OrderContext);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS as any[]);

    const addOrder = (order: OrderItem) => {
        setOrders((prev) => [order, ...prev]);
    };

    const updateOrderStatus = (orderId: string, status: OrderStatus) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    const cancelOrder = (orderId: string) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status: 'Cancelled' as OrderStatus } : order
            )
        );
    }

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, cancelOrder }}>
            {children}
        </OrderContext.Provider>
    );
}
