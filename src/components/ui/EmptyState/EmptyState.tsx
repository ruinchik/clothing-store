import './EmptyState.css';

type EmptyStateProps = {
    type?: 'products' | 'cart' | 'orders';
    message?: string;
};

export function EmptyState({ type = 'products', message }: EmptyStateProps) {
    const getConfig = () => {
        switch (type) {
            case 'cart':
                return {
                    icon: '🛒',
                    title: 'Корзина пуста',
                    description: 'Добавьте товары в корзину, чтобы сделать заказ'
                };
            case 'orders':
                return {
                    icon: '📦',
                    title: 'Заказы не найдены',
                    description: 'У вас пока нет оформленных заказов'
                };
            default:
                return {
                    icon: '🔍',
                    title: 'Товары не найдены',
                    description: 'Попробуйте изменить параметры поиска или фильтры'
                };
        }
    };

    const config = getConfig();

    return (
        <div className="empty-state">
            <div className="empty-state__icon">{config.icon}</div>
            <h3 className="empty-state__title">{message || config.title}</h3>
            <p className="empty-state__description">{config.description}</p>
        </div>
    );
}