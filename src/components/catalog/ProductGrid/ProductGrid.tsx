import { useEffect } from 'react';
import { useCatalogStore } from '../../../stores/catalogStore';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCardSkeleton } from '../../ui/ProductCardSkeleton/ProductCardSkeleton';
import { EmptyState } from '../../ui/EmptyState/EmptyState';
import './ProductGrid.css';

export function ProductGrid() {
    const { 
        items, 
        total, 
        page, 
        pageSize, 
        isLoading, 
        error, 
        load, 
        setPage 
    } = useCatalogStore();

    // Загружаем данные при монтировании и при изменении load функции
    useEffect(() => {
        load();
    }, [load]);

    // Показываем скелетоны во время загрузки
    if (isLoading && items.length === 0) {
        return (
            <div className="product-grid">
                {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    // Показываем ошибку
    if (error) {
        return (
            <div className="product-grid__error">
                <h3>Произошла ошибка</h3>
                <p>{error}</p>
                <button onClick={load} className="product-grid__retry-btn">
                    Попробовать снова
                </button>
            </div>
        );
    }

    // Показываем пустое состояние
    if (!isLoading && items.length === 0) {
        return <EmptyState type="products" />;
    }

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="product-grid-container">
            <div className="product-grid__header">
                <div className="product-grid__total">
                    Найдено товаров: {total}
                    {isLoading && <span className="product-grid__loading-text"> (загрузка...)</span>}
                </div>
            </div>
            
            <div className="product-grid">
                {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="product-grid__pagination">
                    <button 
                        className="product-grid__pagination-btn"
                        disabled={page === 1 || isLoading} 
                        onClick={() => setPage(page - 1)}
                    >
                        Назад
                    </button>
                    
                    <div className="product-grid__pagination-info">
                        Страница {page} из {totalPages}
                    </div>
                    
                    <button
                        className="product-grid__pagination-btn"
                        disabled={page >= totalPages || isLoading}
                        onClick={() => setPage(page + 1)}
                    >
                        Вперёд
                    </button>
                </div>
            )}
        </div>
    );
}