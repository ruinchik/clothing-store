import { useCatalogStore } from '../../../stores/catalogStore';
import { type SortKey, type SortOrder } from '../../../types';
import './Sort.css';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: 'popularity', label: 'По популярности' },
    { key: 'price', label: 'По цене' },
    { key: 'rating', label: 'По рейтингу' },
    { key: 'isNew', label: 'По новизне' }
];

export function Sort() {
    const { sort, setSort } = useCatalogStore();

    const handleKeyChange = (key: SortKey) => {
        setSort({ ...sort, key });
    };

    const handleOrderChange = (order: SortOrder) => {
        setSort({ ...sort, order });
    };

    // Функция для получения подсказки при наведении
    const getOrderTooltip = (): string => {
        if (sort.key === 'price') {
            return sort.order === 'asc' ? 'Сначала дешевые' : 'Сначала дорогие';
        }
        return sort.order === 'asc' ? 'По возрастанию' : 'По убыванию';
    };

    return (
        <div className="sort">
            <span className="sort__label">Сортировка:</span>
            
            <div className="sort__controls">
                <div className="sort__options">
                    {SORT_OPTIONS.map(option => (
                        <button
                            key={option.key}
                            className={`sort__option ${sort.key === option.key ? 'sort__option--active' : ''}`}
                            onClick={() => handleKeyChange(option.key)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <div className="sort__order" title={getOrderTooltip()}>
                    <button
                        className={`sort__order-btn ${sort.order === 'asc' ? 'sort__order-btn--active' : ''}`}
                        onClick={() => handleOrderChange('asc')}
                        aria-label={sort.key === 'price' ? 'Сначала дешевые' : 'По возрастанию'}
                    >
                        ↑
                    </button>
                    <button
                        className={`sort__order-btn ${sort.order === 'desc' ? 'sort__order-btn--active' : ''}`}
                        onClick={() => handleOrderChange('desc')}
                        aria-label={sort.key === 'price' ? 'Сначала дорогие' : 'По убыванию'}
                    >
                        ↓
                    </button>
                </div>
            </div>
        </div>
    );
}