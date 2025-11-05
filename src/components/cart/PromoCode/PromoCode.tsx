import React, { useState } from 'react';
import { useCartStore } from '../../../stores/cartStore';
import './PromoCode.css';

export function PromoCode() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const { promoCode, discount, applyPromoCode, removePromoCode } = useCartStore();

    const handleApply = () => {
        const success = applyPromoCode(code);
        if (success) {
            setError('');
            setCode('');
        } else {
            setError('Промокод не найден');
        }
    };

    const handleRemove = () => {
        removePromoCode();
        setError('');
    };

    if (promoCode) {
        return (
            <div className="promo-code promo-code--applied">
                <div className="promo-code__info">
                    <span className="promo-code__code">Промокод: {promoCode}</span>
                    <span className="promo-code__discount">
                        -{discount}
                        {/* Определяем тип скидки по значению discount */}
                        {discount <= 100 ? '%' : '₽'}
                    </span>
                </div>
                <button className="promo-code__remove" onClick={handleRemove}>
                    ×
                </button>
            </div>
        );
    }

    return (
        <div className="promo-code">
            <div className="promo-code__input-group">
                <input
                    type="text"
                    placeholder="Введите промокод"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="promo-code__input"
                />
                <button 
                    className="promo-code__apply"
                    onClick={handleApply}
                    disabled={!code.trim()}
                >
                    Применить
                </button>
            </div>
            {error && <div className="promo-code__error">{error}</div>}
        </div>
    );
}