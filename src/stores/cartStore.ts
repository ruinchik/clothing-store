import { create } from 'zustand';
import { type Product, type ProductId } from '../types';

export type CartItem = {
    id: ProductId;
    product: Product;
    qty: number;
};

// Mock данные для промокодов
const PROMO_CODES = [
    { code: 'SUMMER2024', discount: 10, type: 'percentage' as const },
    { code: 'BIKE1000', discount: 1000, type: 'fixed' as const },
    { code: 'WELCOME15', discount: 15, type: 'percentage' as const },
];

type CartState = {
    items: Record<ProductId, CartItem>;
    promoCode: string;
    discount: number;
    isCartOpen: boolean;
    addItem: (product: Product, qty?: number) => void;
    removeItem: (id: ProductId) => void;
    changeQty: (id: ProductId, delta: number) => void;
    clear: () => void;
    subtotal: () => number;
    totalQty: () => number;
    applyPromoCode: (code: string) => boolean;
    removePromoCode: () => void;
    finalTotal: () => number;
    openCart: () => void;
    closeCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: {},
    promoCode: '',
    discount: 0,
    isCartOpen: false,

    addItem: (product, qty = 1) =>
        set((s) => {
            const existing = s.items[product.id];
            const nextQty = (existing?.qty ?? 0) + qty;
            return {
                items: {
                    ...s.items,
                    [product.id]: { id: product.id, product, qty: nextQty },
                },
            };
        }),

    removeItem: (id) => set((s) => {
        const copy = { ...s.items };
        delete copy[id];
        return { items: copy };
    }),

    changeQty: (id, delta) => set((s) => {
        const item = s.items[id];
        if (!item) return s;
        const qty = item.qty + delta;
        if (qty <= 0) {
            const copy = { ...s.items };
            delete copy[id];
            return { items: copy };
        }
        return { items: { ...s.items, [id]: { ...item, qty } } };
    }),

    clear: () => set({ items: {}, promoCode: '', discount: 0 }),

    subtotal: () => Object.values(get().items).reduce((sum, it) => sum + it.product.price * it.qty, 0),

    totalQty: () => Object.values(get().items).reduce((sum, it) => sum + it.qty, 0),

    applyPromoCode: (code) => {
        const promo = PROMO_CODES.find(p => p.code === code.toUpperCase());
        if (promo) {
            set({ promoCode: code, discount: promo.discount });
            return true;
        }
        return false;
    },

    removePromoCode: () => set({ promoCode: '', discount: 0 }),

    finalTotal: () => {
        const subtotal = get().subtotal();
        const discount = get().discount;
        const promo = PROMO_CODES.find(p => p.code === get().promoCode);
        
        if (!promo) return subtotal;
        
        if (promo.type === 'percentage') {
            return subtotal * (1 - discount / 100);
        } else {
            return Math.max(0, subtotal - discount);
        }
    },

    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
}));