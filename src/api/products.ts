import { http } from './http';
import { type CatalogFilters, type CatalogSort, type PaginatedResult, type Product } from '../types';
import { fetchProductsMock } from '../mocks/products';

type FetchProductsParams = {
    page?: number;
    pageSize?: number;
    filters?: CatalogFilters;
    sort?: CatalogSort;
};

export async function fetchProducts(params: FetchProductsParams = {}): Promise<PaginatedResult<Product>> {
    const { page = 1, pageSize = 12, filters, sort } = params;
    const query = new URLSearchParams();
    query.set('page', String(page));
    query.set('pageSize', String(pageSize));
    if (filters?.type) query.set('type', filters.type);
    if (filters?.manufacturer) query.set('manufacturer', filters.manufacturer);
    if (filters?.price?.min != null) query.set('priceMin', String(filters.price.min));
    if (filters?.price?.max != null) query.set('priceMax', String(filters.price.max));
    if (filters?.frameSize) query.set('frameSize', filters.frameSize);
    if (filters?.inStock != null) query.set('inStock', String(filters.inStock));
    if (sort) {
        query.set('sortKey', sort.key);
        query.set('sortOrder', sort.order);
    }
    const useMocks = (import.meta.env.VITE_USE_MOCKS as string | undefined) === 'true' || !import.meta.env.VITE_API_URL;
    if (useMocks) {
        return fetchProductsMock({ page, pageSize, filters, sort });
    }
    return http.get(`/products?${query.toString()}`);
}


