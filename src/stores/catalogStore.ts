import { create } from 'zustand';
import { type CatalogFilters, type CatalogSort, type PaginatedResult, type Product } from '../types';
import { fetchProductsMock } from '../mocks/products';

type CatalogState = {
    items: Product[];
    total: number;
    page: number;
    pageSize: number;
    filters: CatalogFilters;
    sort: CatalogSort;
    isLoading: boolean;
    error?: string;
    setFilters: (f: Partial<CatalogFilters>) => void;
    setSort: (s: CatalogSort) => void;
    setPage: (p: number) => void;
    load: () => Promise<void>;
};

const defaultSort: CatalogSort = { key: 'popularity', order: 'desc' };

export const useCatalogStore = create<CatalogState>((set, get) => ({
    items: [],
    total: 0,
    page: 1,
    pageSize: 12,
    filters: {},
    sort: defaultSort,
    isLoading: false,
    error: undefined,
    
    setFilters: (f) => {
        set((state) => ({ 
            filters: { ...state.filters, ...f }, 
            page: 1  // Сбрасываем на первую страницу при изменении фильтров
        }));
        // Автоматически загружаем данные с новыми фильтрами
        get().load();
    },
    
    setSort: (s) => {
        set({ 
            sort: s, 
            page: 1  // Сбрасываем на первую страницу при изменении сортировки
        });
        // Автоматически загружаем данные с новой сортировкой
        get().load();
    },
    
    setPage: (p) => {
        set({ page: p });
        // Автоматически загружаем данные для новой страницы
        get().load();
    },
    
    load: async () => {
        const { page, pageSize, filters, sort } = get();
        set({ isLoading: true, error: undefined });
        
        try {
            const res: PaginatedResult<Product> = await fetchProductsMock({ 
                page, 
                pageSize, 
                filters, 
                sort 
            });
            
            set({ 
                items: res.items, 
                total: res.total, 
                isLoading: false 
            });
        } catch (e) {
            set({ 
                isLoading: false, 
                error: e instanceof Error ? e.message : 'Unknown error' 
            });
        }
    },
}));