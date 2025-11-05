import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../stores/cartStore';
import './Header.css';

export function Header() {
    const navigate = useNavigate();
    const { totalQty } = useCartStore();

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    Вело-Магазин
                </Link>
                
                <nav className="header__nav">
                    <Link to="/" className="header__nav-link">
                        Каталог
                    </Link>
                    <button 
                        className="header__cart-btn"
                        onClick={() => navigate('/cart')}
                    >
                        Корзина ({totalQty()})
                    </button>
                </nav>
            </div>
        </header>
    );
}