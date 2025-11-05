import { type CatalogFilters, type CatalogSort, type PaginatedResult, type Product } from '../types';

const catalog: Product[] = [
    {
        id: '1',
        title: 'Горный велосипед Trailblazer 500',
        description: 'Лёгкая алюминиевая рама, дисковые тормоза',
        imageUrl: 'https://picsum.photos/seed/bike1/600/400',
        price: 45990,
        rating: 4.4,
        popularity: 210,
        isNew: false,
        inStock: true,
        type: 'горный',
        manufacturer: 'Trek',
        frameSize: 'M',
    },
    {
        id: '2',
        title: 'Шоссейный Aero 300',
        description: 'Карбоновая вилка, 2x11',
        imageUrl: 'https://picsum.photos/seed/bike2/600/400',
        price: 99990,
        rating: 4.7,
        popularity: 320,
        isNew: true,
        inStock: true,
        type: 'шоссейный',
        manufacturer: 'Giant',
        frameSize: 'L',
    },
    {
        id: '3',
        title: 'Городской Comfort 7',
        description: 'Низкая рама, планетарная втулка',
        imageUrl: 'https://picsum.photos/seed/bike3/600/400',
        price: 32990,
        rating: 4.2,
        popularity: 180,
        isNew: false,
        inStock: true,
        type: 'городской',
        manufacturer: 'Author',
        frameSize: 'M',
    },
    {
        id: '4',
        title: 'Гибридный Crossway 100',
        description: 'Комфортная посадка, 700с',
        imageUrl: 'https://picsum.photos/seed/bike4/600/400',
        price: 37990,
        rating: 4.1,
        popularity: 150,
        isNew: false,
        inStock: false,
        type: 'гибридный',
        manufacturer: 'Merida',
        frameSize: 'S',
    },
    {
        id: '5',
        title: 'BMX Street Pro',
        description: 'Прочная стальная рама, пеги',
        imageUrl: 'https://picsum.photos/seed/bike5/600/400',
        price: 25990,
        rating: 4.6,
        popularity: 400,
        isNew: true,
        inStock: true,
        type: 'BMX',
        manufacturer: 'Kink',
        frameSize: '20.5"',
    },
    // дополнительные элементы для объёма
    ...Array.from({ length: 15 }).map((_, i) => ({
        id: String(6 + i),
        title: `Горный Ridge ${i + 1}`,
        description: 'Надёжный хардтейл для трейлов',
        imageUrl: `https://picsum.photos/seed/bike${6 + i}/600/400`,
        price: 29990 + i * 1500,
        rating: 3.8 + ((i % 5) * 0.2),
        popularity: 100 + i * 10,
        isNew: i % 4 === 0,
        inStock: i % 3 !== 0,
        type: (['горный', 'городской', 'гибридный', 'шоссейный'] as const)[i % 4],
        manufacturer: (['Trek', 'Giant', 'Merida', 'Author'] as const)[i % 4],
        frameSize: (['S', 'M', 'L'] as const)[i % 3],
    })),
];

function applyFilters(items: Product[], filters?: CatalogFilters) {
    if (!filters) return items;
    return items.filter((p) => {
        // ПОИСК по названию, описанию и производителю ← ИСПРАВЛЕНО
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const matchesTitle = p.title.toLowerCase().includes(searchTerm);
            const matchesDescription = p.description.toLowerCase().includes(searchTerm);
            const matchesManufacturer = p.manufacturer.toLowerCase().includes(searchTerm);
            if (!matchesTitle && !matchesDescription && !matchesManufacturer) return false;
        }
        
        // Остальные фильтры
        if (filters.type && p.type !== filters.type) return false;
        if (filters.manufacturer && p.manufacturer !== filters.manufacturer) return false;
        if (filters.frameSize && p.frameSize !== filters.frameSize) return false;
        if (filters.price?.min != null && p.price < filters.price.min) return false;
        if (filters.price?.max != null && p.price > filters.price.max) return false;
        if (filters.inStock != null && !!filters.inStock !== p.inStock) return false;
        return true;
    });
}

function applySort(items: Product[], sort?: CatalogSort) {
    if (!sort) return items;
    const dir = sort.order === 'asc' ? 1 : -1;
    const arr = [...items];
    arr.sort((a, b) => {
        const ak = sort.key === 'isNew' ? Number(a.isNew) : (a as any)[sort.key];
        const bk = sort.key === 'isNew' ? Number(b.isNew) : (b as any)[sort.key];
        return ak > bk ? dir : ak < bk ? -dir : 0;
    });
    return arr;
}

export async function fetchProductsMock({
    page = 1,
    pageSize = 12,
    filters,
    sort,
}: {
    page?: number;
    pageSize?: number;
    filters?: CatalogFilters;
    sort?: CatalogSort;
} = {}): Promise<PaginatedResult<Product>> {
    const filtered = applyFilters(catalog, filters);
    const sorted = applySort(filtered, sort);
    const start = (page - 1) * pageSize;
    const items = sorted.slice(start, start + pageSize);
    // имитация сети
    await new Promise((r) => setTimeout(r, 200));
    return { items, total: filtered.length, page, pageSize };
}