import React from 'react';
import './DeliveryOptions.css';

export type DeliveryOption = {
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedDays: string;
};

type Props = {
    selectedOption?: string;
    onOptionSelect: (optionId: string) => void;
};

const DELIVERY_OPTIONS: DeliveryOption[] = [
    {
        id: 'pickup',
        name: 'Самовывоз',
        description: 'Бесплатный самовывоз из нашего магазина',
        price: 0,
        estimatedDays: '1-2 дня'
    },
    {
        id: 'courier',
        name: 'Курьерская доставка',
        description: 'Доставка курьером до двери',
        price: 500,
        estimatedDays: '2-3 дня'
    },
    {
        id: 'post',
        name: 'Почта России',
        description: 'Доставка через отделение почты',
        price: 300,
        estimatedDays: '5-7 дней'
    }
];

export function DeliveryOptions({ selectedOption, onOptionSelect }: Props) {
    return (
        <div className="delivery-options">
            <h2 className="delivery-options__title">Способ доставки</h2>
            
            <div className="delivery-options__list">
                {DELIVERY_OPTIONS.map((option) => (
                    <div
                        key={option.id}
                        className={`delivery-option ${
                            selectedOption === option.id ? 'delivery-option--selected' : ''
                        }`}
                        onClick={() => onOptionSelect(option.id)}
                    >
                        <div className="delivery-option__header">
                            <div className="delivery-option__radio">
                                <input
                                    type="radio"
                                    id={`delivery-${option.id}`}
                                    name="delivery"
                                    value={option.id}
                                    checked={selectedOption === option.id}
                                    onChange={() => onOptionSelect(option.id)}
                                    className="delivery-option__radio-input"
                                />
                                <label 
                                    htmlFor={`delivery-${option.id}`}
                                    className="delivery-option__name"
                                >
                                    {option.name}
                                </label>
                            </div>
                            <div className="delivery-option__price">
                                {option.price === 0 ? 'Бесплатно' : `${option.price.toLocaleString()} ₽`}
                            </div>
                        </div>
                        
                        <div className="delivery-option__description">
                            {option.description}
                        </div>
                        
                        <div className="delivery-option__details">
                            <span className="delivery-option__eta">
                Срок доставки: {option.estimatedDays}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}