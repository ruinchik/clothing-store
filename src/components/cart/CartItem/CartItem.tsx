import React from 'react';
import { useCartStore } from '../../../stores/cartStore';
import { type CartItem as CartItemType } from '../../../types';
import './CartItem.css';

type Props = {
    item: CartItemType;
};

export function CartItem({ item }: Props) {
    const changeQty = useCartStore((s) => s.changeQty);
    const removeItem = useCartStore((s) => s.removeItem);

    return (
        <div className="cart-item">
            <img 
                src={item.product.imageUrl} 
                alt={item.product.title}
                className="cart-item__image"
            />
            
            <div className="cart-item__info">
                <h4 className="cart-item__title">{item.product.title}</h4>
                <p className="cart-item__description">{item.product.description}</p>
                <div className="cart-item__price">{item.product.price.toLocaleString()} ₽</div>
            </div>

            <div className="cart-item__controls">
                <div className="cart-item__quantity">
                    <button 
                        className="cart-item__qty-btn"
                        onClick={() => changeQty(item.id, -1)}
                        disabled={item.qty <= 1}
                    >
                        -
                    </button>
                    <span className="cart-item__qty">{item.qty}</span>
                    <button 
                        className="cart-item__qty-btn"
                        onClick={() => changeQty(item.id, 1)}
                    >
                        +
                    </button>
                </div>
                
                <div className="cart-item__total">
                    {(item.product.price * item.qty).toLocaleString()} ₽
                </div>

                <button 
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label="Удалить"
                >
                    ×
                </button>
            </div>
        </div>
    );
}