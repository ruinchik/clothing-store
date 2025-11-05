import './CartPage.css';
import { useCartStore } from '../../../stores/cartStore';
import { CartItem } from '../CartItem/CartItem';
import { PromoCode } from '../PromoCode/PromoCode';

interface Props {
    onCheckout?: () => void;
}

export function CartPage({ onCheckout }: Props) {
    const { items, subtotal, finalTotal, clear, closeCart } = useCartStore();
    const cartItems = Object.values(items);
    const isEmpty = cartItems.length === 0;

    const handleCheckout = () => {
        if (onCheckout) {
            onCheckout();
        }
    };

    if (isEmpty) {
        return (
            <div className="cart-page">
                <div className="cart-page__header">
                    <h2>Корзина</h2>
                    <button className="cart-page__close" onClick={closeCart}>×</button>
                </div>
                <div className="cart-page__empty">
                    <p>Ваша корзина пуста</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-page__header">
                <h2>Корзина</h2>
                <button className="cart-page__close" onClick={closeCart}>×</button>
            </div>
            
            <div className="cart-page__content">
                <div className="cart-page__items">
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                
                <div className="cart-page__sidebar">
                    <PromoCode />
                    <div className="cart-page__summary">
                        <div className="summary-row">
                            <span>Товары:</span>
                            <span>{subtotal().toLocaleString()} ₽</span>
                        </div>
                        <div className="summary-row total">
                            <span>Итого:</span>
                            <span>{finalTotal().toLocaleString()} ₽</span>
                        </div>
                        
                        <button 
                            className="cart-page__checkout-btn"
                            onClick={handleCheckout}
                        >
                            Перейти к оформлению
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}