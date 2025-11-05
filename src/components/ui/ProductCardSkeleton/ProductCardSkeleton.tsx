import './ProductCardSkeleton.css';

export function ProductCardSkeleton() {
    return (
        <div className="product-card-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-meta">
                    <div className="skeleton-tag"></div>
                    <div className="skeleton-tag"></div>
                </div>
                <div className="skeleton-footer">
                    <div className="skeleton-price"></div>
                    <div className="skeleton-button"></div>
                </div>
            </div>
        </div>
    );
}