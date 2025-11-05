import './CatalogPage.css';
import { Filters } from '../Filters/Filters';
import { Search } from '../Search/Search';
import { Sort } from '../Sort/Sort';
import { ProductGrid } from '../ProductGrid/ProductGrid';

export function CatalogPage() {
    return (
        <div className="catalog-page">
            <div className="catalog-page__layout">
                <Filters />
                <div className="catalog-page__content">
                    <h1 className="catalog-page__title">Велосипеды</h1>
                    <Search />
                    <Sort />
                    <ProductGrid />
                </div>
            </div>
        </div>
    );
}