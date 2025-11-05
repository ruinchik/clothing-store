import { useCartStore } from '../../../stores/cartStore';
import './CartIcon.css';

export function CartIcon() {
    const { totalQty, openCart } = useCartStore();

    const handleClick = () => {
        openCart(); // Открываем модальное окно корзины
    };

    return (
        <button className="cart-icon" onClick={handleClick}>
            🛒 Корзина ({totalQty()})
        </button>
    );
}