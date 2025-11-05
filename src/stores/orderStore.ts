import { create } from 'zustand';

interface OrderItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    items: OrderItem[];
    customerInfo: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
    };
    delivery: {
        method: string;
        cost: number;
    };
    payment: {
        method: string;
    };
    total: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
}

interface OrderState {
    orders: Order[];
    currentOrder: Order | null;
    isLoading: boolean;
    error: string | null;
    
    createOrder: (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => Promise<string>;
    getOrder: (orderId: string) => Order | undefined;
    getUserOrders: () => Order[];
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null,

    createOrder: async (orderData) => {
        set({ isLoading: true, error: null });
        
        try {
            // Имитация API вызова
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newOrder: Order = {
                ...orderData,
                id: `order-${Date.now()}`,
                status: 'pending',
                createdAt: new Date(),
            };
            
            set(state => ({
                orders: [...state.orders, newOrder],
                currentOrder: newOrder,
                isLoading: false,
            }));
            
            return newOrder.id;
        } catch (error) {
            set({ 
                error: 'Ошибка при создании заказа', 
                isLoading: false 
            });
            throw error;
        }
    },

    getOrder: (orderId) => {
        return get().orders.find(order => order.id === orderId);
    },

    getUserOrders: () => {
        return get().orders;
    },

    setLoading: (loading) => {
        set({ isLoading: loading });
    },

    setError: (error) => {
        set({ error });
    },

    clearCurrentOrder: () => {
        set({ currentOrder: null });
    },
}));