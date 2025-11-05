import { useState } from 'react';
import './App.css';
import { ThemeToggle } from './components/theme/ThemeToggle/ThemeToggle';
import { Filters } from './components/catalog/Filters/Filters';
import { Search } from './components/catalog/Search/Search';
import { Sort } from './components/catalog/Sort/Sort';
import { ProductGrid } from './components/catalog/ProductGrid/ProductGrid';
import { CartIcon } from './components/cart/CartIcon/CartIcon';
import { CartPage } from './components/cart/CartPage/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage/CheckoutPage';
import { Notification } from './components/ui/Notification/Notification';
import { useCartStore } from './stores';

function App() {
    const { isCartOpen, openCart, closeCart } = useCartStore();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info';
        isVisible: boolean;
    }>({ message: '', type: 'info', isVisible: false });

    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setNotification({ message, type, isVisible: true });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, isVisible: false }));
        }, 3000);
    };

    const handleOpenCheckout = () => {
        closeCart();
        setIsCheckoutOpen(true);
    };

    const handleCloseCheckout = () => {
        setIsCheckoutOpen(false);
    };

    return (
        <>
            <div className="app">
                {/* Шапка - такая же липкая как фильтры */}
                <header className="app__header">
                    <div className="app__header-inner">
                        <h1 className="app__title">Веломагазин</h1>
                        <div className="app__controls">
                            <ThemeToggle />
                            <CartIcon />
                        </div>
                    </div>
                </header>
                
                {/* Основной контент */}
                <main className="app__main">
                    <div className="app__container">
                        {/* Боковая панель с фильтрами */}
                        <aside className="app__sidebar">
                            <Filters />
                        </aside>
                        
                        {/* Основная область с товарами */}
                        <div className="app__content">
                            <h1 className="app__page-title">Велосипеды</h1>
                            <Search />
                            <Sort />
                            <ProductGrid />
                        </div>
                    </div>
                </main>
            </div>

            {/* Модальное окно корзины */}
            {isCartOpen && (
                <div className="modal-overlay" onClick={closeCart}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CartPage onCheckout={handleOpenCheckout} />
                    </div>
                </div>
            )}

            {/* Модальное окно оформления заказа */}
            {isCheckoutOpen && (
                <div className="modal-overlay" onClick={handleCloseCheckout}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CheckoutPage onClose={handleCloseCheckout} />
                    </div>
                </div>
            )}

            {/* Компонент уведомлений */}
            <Notification 
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
            />
        </>
    );
}

export default App;