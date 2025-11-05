import './ThemeToggle.css';
import { useThemeStore } from '../../../stores/themeStore';

export function ThemeToggle() {
    const { mode, toggle } = useThemeStore();

    return (
        <button 
            className="theme-toggle"
            onClick={toggle}
            aria-label="Переключить тему"
        >
            {mode === 'light' ? '🌙' : '☀️'}
        </button>
    );
}