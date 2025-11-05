import './Layout.css';
import { ThemeToggle } from '../../theme/ThemeToggle/ThemeToggle';
import { CartIcon } from '../../cart/CartIcon/CartIcon';

interface LayoutProps {
    children: React.ReactNode;
    onShowNotification?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function Layout({ children, onShowNotification }: LayoutProps) {
    return (
        <div className="app">
            <header className="app__header">
                <h1 className="app__title">Веломагазин</h1>
                <div className="app__controls">
                    <ThemeToggle />
                    <CartIcon />
                </div>
            </header>
            
            <main className="app__main">
                {children}
            </main>
        </div>
    );
}