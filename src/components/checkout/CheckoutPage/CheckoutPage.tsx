import React, { useState } from 'react';
import './CheckoutPage.css';
import { CheckoutForm } from '../CheckoutForm/CheckoutForm';
import { DeliveryOptions } from '../DeliveryOptions/DeliveryOptions';
import { PaymentMethods } from '../PaymentMethods/PaymentMethods';
import { useCartStore } from '../../../stores/cartStore';
import { useOrderStore } from '../../../stores/orderStore';

interface Props {
    onClose?: () => void;
}

type CheckoutStep = 'customer' | 'delivery' | 'payment' | 'confirmation';

export function CheckoutPage({ onClose }: Props) {
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer');
    const [customerData, setCustomerData] = useState<any>(null);
    const [selectedDelivery, setSelectedDelivery] = useState<string>('');
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    
    const { finalTotal, clear: clearCart } = useCartStore();
    const { createOrder, isLoading } = useOrderStore();

    const handleCustomerSubmit = (data: any) => {
        setCustomerData(data);
        setCurrentStep('delivery');
    };

    const handleDeliverySelect = (optionId: string) => {
        setSelectedDelivery(optionId);
    };

    const handlePaymentSelect = (methodId: string) => {
        setSelectedPayment(methodId);
    };

    const handleNextStep = () => {
        switch (currentStep) {
            case 'delivery':
                if (selectedDelivery) {
                    setCurrentStep('payment');
                }
                break;
            case 'payment':
                if (selectedPayment) {
                    handlePlaceOrder();
                }
                break;
        }
    };

    const handlePlaceOrder = async () => {
        if (!customerData || !selectedDelivery || !selectedPayment) return;

        try {
            await createOrder({
                items: [], // Здесь нужно передать реальные items из корзины
                customerInfo: customerData,
                delivery: {
                    method: selectedDelivery,
                    cost: getDeliveryCost(selectedDelivery)
                },
                payment: {
                    method: selectedPayment
                },
                total: finalTotal()
            });
            
            setCurrentStep('confirmation');
            clearCart();
        } catch (error) {
            console.error('Order creation failed:', error);
        }
    };

    const getDeliveryCost = (deliveryId: string): number => {
        const deliveryOptions = [
            { id: 'pickup', cost: 0 },
            { id: 'courier', cost: 500 },
            { id: 'post', cost: 300 }
        ];
        return deliveryOptions.find(opt => opt.id === deliveryId)?.cost || 0;
    };

    const handleBack = () => {
        switch (currentStep) {
            case 'delivery':
                setCurrentStep('customer');
                break;
            case 'payment':
                setCurrentStep('delivery');
                break;
            default:
                break;
        }
    };

    const getStepNumber = (step: CheckoutStep): number => {
        const steps: CheckoutStep[] = ['customer', 'delivery', 'payment', 'confirmation'];
        return steps.indexOf(step) + 1;
    };

    const canProceed = () => {
        switch (currentStep) {
            case 'delivery':
                return selectedDelivery !== '';
            case 'payment':
                return selectedPayment !== '';
            default:
                return false;
        }
    };

    return (
        <div className="checkout-page">
            <div className="checkout-page__header">
                <h2>Оформление заказа</h2>
                <button className="checkout-page__close" onClick={onClose}>×</button>
            </div>
            
            {/* Прогресс бар */}
            <div className="checkout-progress">
                <div className={`progress-step ${currentStep === 'customer' ? 'active' : ''} ${getStepNumber(currentStep) > 1 ? 'completed' : ''}`}>
                    <span>1</span>
                    <span>Данные</span>
                </div>
                <div className={`progress-step ${currentStep === 'delivery' ? 'active' : ''} ${getStepNumber(currentStep) > 2 ? 'completed' : ''}`}>
                    <span>2</span>
                    <span>Доставка</span>
                </div>
                <div className={`progress-step ${currentStep === 'payment' ? 'active' : ''} ${getStepNumber(currentStep) > 3 ? 'completed' : ''}`}>
                    <span>3</span>
                    <span>Оплата</span>
                </div>
                <div className={`progress-step ${currentStep === 'confirmation' ? 'active' : ''}`}>
                    <span>4</span>
                    <span>Подтверждение</span>
                </div>
            </div>

            <div className="checkout-page__content">
                {/* Шаг 1: Данные покупателя */}
                {currentStep === 'customer' && (
                    <div className="checkout-step">
                        <CheckoutForm 
                            onSubmit={handleCustomerSubmit}
                            initialValues={customerData}
                        />
                    </div>
                )}

                {/* Шаг 2: Доставка */}
                {currentStep === 'delivery' && (
                    <div className="checkout-step">
                        <DeliveryOptions 
                            selectedOption={selectedDelivery}
                            onOptionSelect={handleDeliverySelect}
                        />
                        <div className="checkout-actions">
                            <button className="checkout-back-btn" onClick={handleBack}>
                                ← Назад
                            </button>
                            <button 
                                className="checkout-submit-btn"
                                onClick={handleNextStep}
                                disabled={!canProceed()}
                            >
                                Продолжить
                            </button>
                        </div>
                    </div>
                )}

                {/* Шаг 3: Оплата */}
                {currentStep === 'payment' && (
                    <div className="checkout-step">
                        <PaymentMethods 
                            selectedMethod={selectedPayment}
                            onMethodSelect={handlePaymentSelect}
                        />
                        <div className="checkout-actions">
                            <button className="checkout-back-btn" onClick={handleBack}>
                                ← Назад
                            </button>
                            <button 
                                className="checkout-submit-btn"
                                onClick={handleNextStep}
                                disabled={!canProceed() || isLoading}
                            >
                                {isLoading ? 'Оформление...' : 'Оформить заказ'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Шаг 4: Подтверждение */}
                {currentStep === 'confirmation' && (
                    <div className="checkout-step confirmation-step">
                        <div className="confirmation-content">
                            <div className="confirmation-icon">✓</div>
                            <h3>Заказ успешно оформлен!</h3>
                            <p>Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.</p>
                            <button 
                                className="confirmation-close-btn"
                                onClick={onClose}
                            >
                                Вернуться в магазин
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}