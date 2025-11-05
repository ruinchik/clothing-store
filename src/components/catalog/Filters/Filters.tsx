import { useCatalogStore } from '../../../stores/catalogStore';
import './Filters.css';

export function Filters() {
    const filters = useCatalogStore((s) => s.filters);
    const setFilters = useCatalogStore((s) => s.setFilters);

    const handleClearFilters = () => {
        setFilters({
            type: undefined,
            manufacturer: undefined,
            price: {},
            frameSize: undefined,
            inStock: undefined
        });
    };

    const hasActiveFilters = 
        filters.type || 
        filters.manufacturer || 
        filters.frameSize || 
        filters.price?.min || 
        filters.price?.max || 
        filters.inStock;

    return (
        <aside className="filters">
            <div className="filters__header">
                <h3 className="filters__title">Фильтры</h3>
                {hasActiveFilters && (
                    <button className="filters__clear" onClick={handleClearFilters}>
                        Сбросить
                    </button>
                )}
            </div>

            <div className="filters__section">
                <div className="filters__section-title">Категория</div>
                <label className="filters__row">
                    <span>Тип</span>
                    <select
                        value={filters.type ?? ''}
                        onChange={(e) => setFilters({ type: (e.target.value || undefined) as any })}
                    >
                        <option value="">Все</option>
                        <option value="горный">Горный</option>
                        <option value="шоссейный">Шоссейный</option>
                        <option value="городской">Городской</option>
                        <option value="гибридный">Гибридный</option>
                        <option value="BMX">BMX</option>
                        <option value="другой">Другой</option>
                    </select>
                </label>
            </div>

            <div className="filters__section">
                <div className="filters__section-title">Бренды</div>
                <label className="filters__row">
                    <span>Производитель</span>
                    <select
                        value={filters.manufacturer ?? ''}
                        onChange={(e) => setFilters({ manufacturer: e.target.value || undefined })}
                    >
                        <option value="">Все</option>
                        <option value="Trek">Trek</option>
                        <option value="Giant">Giant</option>
                        <option value="Merida">Merida</option>
                        <option value="Author">Author</option>
                        <option value="Kink">Kink</option>
                    </select>
                </label>
                
                <label className="filters__row">
                    <span>Размер рамы</span>
                    <input
                        placeholder="M, L, 54, 19&quot;"
                        value={filters.frameSize ?? ''}
                        onChange={(e) => setFilters({ frameSize: e.target.value || undefined })}
                    />
                </label>
            </div>

            <div className="filters__section">
                <div className="filters__section-title">Цена</div>
                <label className="filters__row">
                    <span>Цена, ₽</span>
                    <div className="filters__price-inputs">
                        <input
                            type="number"
                            placeholder="От"
                            min="0"
                            value={filters.price?.min ?? ''}
                            onChange={(e) => setFilters({ 
                                price: { 
                                    ...filters.price, 
                                    min: e.target.value ? Number(e.target.value) : undefined 
                                } 
                            })}
                        />
                        <span className="filters__price-separator">-</span>
                        <input
                            type="number"
                            placeholder="До"
                            min="0"
                            value={filters.price?.max ?? ''}
                            onChange={(e) => setFilters({ 
                                price: { 
                                    ...filters.price, 
                                    max: e.target.value ? Number(e.target.value) : undefined 
                                } 
                            })}
                        />
                    </div>
                </label>
            </div>

            <div className="filters__section">
                <label className="filters__checkbox">
                    <input
                        type="checkbox"
                        checked={!!filters.inStock}
                        onChange={(e) => setFilters({ inStock: e.target.checked || undefined })}
                    />
                    <span>Только в наличии</span>
                </label>
            </div>
        </aside>
    );
}