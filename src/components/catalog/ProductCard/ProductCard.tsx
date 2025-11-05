import { useState } from 'react';
import { useCartStore } from '../../../stores';
import { type Product } from '../../../types';
import './ProductCard.css';

type Props = {
    product: Product;
};

export function ProductCard({ product }: Props) {
    const [isAdded, setIsAdded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const addItem = useCartStore((s) => s.addItem);

    const handleAddToCart = () => {
        addItem(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1000);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    return (
        <div className="product-card">
            <div className="product-card__image">
                {imageError ? (
                    <div className="product-card__image-fallback">
                        <span>Картинка</span>
                    </div>
                ) : (
                    <>
                        {imageLoading && (
                            <div className="product-card__image-loading">
                                <div className="loading-spinner"></div>
                            </div>
                        )}
                        <img 
                            src={product.imageUrl} 
                            alt={product.title}
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            style={{ opacity: imageLoading ? 0 : 1 }}
                        />
                    </>
                )}
                
                {/* Бейдж "Новинка" - сдвинут ниже */}
                {product.isNew && <span className="product-card__badge">Новинка</span>}
                
                {/* Overlay "Нет в наличии" */}
                {!product.inStock && (
                    <div className="product-card__out-of-stock">Нет в наличии</div>
                )}
            </div>
            
            <div className="product-card__content">
                <h3 className="product-card__title">{product.title}</h3>
                <p className="product-card__description">{product.description}</p>
                
                <div className="product-card__meta">
                    <span className="product-card__type">{product.type}</span>
                    <span className="product-card__manufacturer">{product.manufacturer}</span>
                    <span className="product-card__size">Размер: {product.frameSize}</span>
                </div>

                <div className="product-card__rating">
                    <span className="product-card__rating-stars">
                        {'★'.repeat(Math.round(product.rating))}
                        {'☆'.repeat(5 - Math.round(product.rating))}
                    </span>
                    <span>({product.rating})</span>
                </div>

                <div className="product-card__footer">
                    <div className="product-card__price">{product.price.toLocaleString()} ₽</div>
                    <button 
                        className={`product-card__add-btn ${isAdded ? 'product-card__add-btn--added' : ''}`}
                        onClick={handleAddToCart}
                        disabled={!product.inStock || isAdded}
                        aria-label={`Добавить ${product.title} в корзину`}
                    >
                        {isAdded ? '✓ Добавлено' : (product.inStock ? 'В корзину' : 'Нет в наличии')}
                    </button>
                </div>
            </div>
        </div>
    );
}