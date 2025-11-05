import { useState } from 'react';
import { useCatalogStore } from '../../../stores/catalogStore';
import './Search.css';

export function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const setFilters = useCatalogStore((s) => s.setFilters);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        // Правильная логика поиска - отдельное поле search
        setFilters({
            search: value.trim() || undefined
            // Не сбрасываем другие фильтры при поиске
        });
    };

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Поиск велосипедов..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="search__input"
            />
            <button className="search__button">
                🔍
            </button>
        </div>
    );
}