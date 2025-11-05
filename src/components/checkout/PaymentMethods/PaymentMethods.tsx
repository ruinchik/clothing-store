import React from 'react';
import './PaymentMethods.css';

export type PaymentMethod = {
    id: string;
    name: string;
    description: string;
    icon?: string;
};

type Props = {
    selectedMethod?: string;
    onMethodSelect: (methodId: string) => void;
};

const PAYMENT_METHODS: PaymentMethod[] = [
    {
        id: 'online',
        name: 'Онлайн-оплата',
        description: 'Банковской картой через безопасный шлюз'
    },
    {
        id: 'cash',
        name: 'Наличными при получении',
        description: 'Оплата наличными курьеру или в пункте выдачи'
    },
    {
        id: 'card',
        name: 'Картой при получении',
        description: 'Оплата банковской картой при получении заказа'
    }
];

export function PaymentMethods({ selectedMethod, onMethodSelect }: Props) {
    return (
        <div className="payment-methods">
            <h2 className="payment-methods__title">Способ оплаты</h2>
            
            <div className="payment-methods__list">
                {PAYMENT_METHODS.map((method) => (
                    <div
                        key={method.id}
                        className={`payment-method ${
                            selectedMethod === method.id ? 'payment-method--selected' : ''
                        }`}
                        onClick={() => onMethodSelect(method.id)}
                    >
                        <div className="payment-method__header">
                            <div className="payment-method__radio">
                                <input
                                    type="radio"
                                    id={`payment-${method.id}`}
                                    name="payment"
                                    value={method.id}
                                    checked={selectedMethod === method.id}
                                    onChange={() => onMethodSelect(method.id)}
                                    className="payment-method__radio-input"
                                />
                                <label 
                                    htmlFor={`payment-${method.id}`}
                                    className="payment-method__name"
                                >
                                    {method.name}
                                </label>
                            </div>
                        </div>
                        
                        <div className="payment-method__description">
                            {method.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}