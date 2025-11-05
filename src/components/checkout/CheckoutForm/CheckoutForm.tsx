import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CheckoutForm.css';

const validationSchema = Yup.object({
    fullName: Yup.string()
        .min(2, 'Минимум 2 символа')
        .max(50, 'Максимум 50 символов')
        .required('Обязательное поле'),
    email: Yup.string()
        .email('Неверный формат email')
        .required('Обязательное поле'),
    phone: Yup.string()
        .matches(/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/, 'Неверный формат телефона')
        .required('Обязательное поле'),
    address: Yup.string()
        .min(10, 'Минимум 10 символов')
        .required('Обязательное поле'),
});

interface CheckoutFormValues {
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

interface Props {
    onSubmit: (values: CheckoutFormValues) => void;
    initialValues?: Partial<CheckoutFormValues>;
}

const defaultFormValues: CheckoutFormValues = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
};

export function CheckoutForm({ onSubmit, initialValues }: Props) {
    const formik = useFormik({
        initialValues: { ...defaultFormValues, ...initialValues },
        validationSchema: validationSchema,
        onSubmit: onSubmit,
        enableReinitialize: true
    });

    const isFormValid = formik.isValid && formik.dirty;

    // УБИРАЕМ авто-отправку формы
    // React.useEffect(() => {
    //     if (isFormValid) {
    //         onSubmit(formik.values);
    //     }
    // }, [isFormValid, formik.values, onSubmit]);

    return (
        <div className="checkout-form">
            <h2 className="checkout-form__title">Данные покупателя</h2>
            
            <form onSubmit={formik.handleSubmit} className="checkout-form__form">
                <div className="checkout-form__field">
                    <label htmlFor="fullName" className="checkout-form__label">
                        ФИО *
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="checkout-form__input"
                        placeholder="Иванов Иван Иванович"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div className="checkout-form__error">{formik.errors.fullName}</div>
                    )}
                </div>

                <div className="checkout-form__field">
                    <label htmlFor="email" className="checkout-form__label">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="checkout-form__input"
                        placeholder="ivanov@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="checkout-form__error">{formik.errors.email}</div>
                    )}
                </div>

                <div className="checkout-form__field">
                    <label htmlFor="phone" className="checkout-form__label">
                        Телефон *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="checkout-form__input"
                        placeholder="+7 (999) 999-99-99"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <div className="checkout-form__error">{formik.errors.phone}</div>
                    )}
                </div>

                <div className="checkout-form__field">
                    <label htmlFor="address" className="checkout-form__label">
                        Адрес доставки *
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        className="checkout-form__textarea"
                        placeholder="Город, улица, дом, квартира"
                        rows={3}
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address && (
                        <div className="checkout-form__error">{formik.errors.address}</div>
                    )}
                </div>

                {/* ВОЗВРАЩАЕМ кнопку продолжить */}
                <button
                    type="submit"
                    className="checkout-form__submit"
                    disabled={!isFormValid}
                >
                    Продолжить
                </button>
            </form>
        </div>
    );
}