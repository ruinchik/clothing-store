import './Notification.css';

type Props = {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
};

export function Notification({ message, type, isVisible }: Props) {
    if (!isVisible) return null;

    return (
        <div className={`notification notification--${type}`}>
            {message}
        </div>
    );
}