import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import api from '../../../utility/api'
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'http://localhost:3000/user/',
                },
            });

            if (error) {
                setErrorMessage(error.message);
            } else {
                // Payment succeeded
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Thông tin thanh toán</h2>
            <div className="mb-4">
                <PaymentElement className="bg-gray-50 p-4 border border-gray-300 rounded-lg" />
            </div>
            <button
                type="submit"
                disabled={!stripe || !elements}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Pay
            </button>
            {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
        </form>
    );
};

const stripePromise = loadStripe('pk_test_51PLkCgP8cGe0Z8qslsqVOxp3MWjT7yF0lXWsJwAaNufUmLyg4no7m5iCgDRWUzPHEturj5DulAyGsEInLP1g4dIf004Gse7Tf8');

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Fetch clientSecret from the backend
        const fetchClientSecret = async () => {
            try {
                const response = await api.post('/user/create-payment-intent');
                setClientSecret(response.data.client_secret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
        };

        fetchClientSecret();
    }, []);
    console.log('a', clientSecret)
    const orders = [
        {
            id: 1,
            total_price: 1029402,
            shipping_money: 123,
        },
        {
            id: 2,
            total_price: 203412,
            shipping_money: 123,
        },
        {
            id: 3,
            total_price: 2930492,
            shipping_money: 123,
        },
        {
            id: 4,
            total_price: 3040244,
            shipping_money: 123,
        },
        {
            id: 5,
            total_price: 2938402,
            shipping_money: 123,
        },
        {
            id: 6,
            total_price: 9283942,
            shipping_money: 123,
        },
        {
            id: 7,
            total_price: 2930492,
            shipping_money: 123,
        },
        {
            id: 8,
            total_price: 3040244,
            shipping_money: 123,
        },
        {
            id: 9,
            total_price: 2938402,
            shipping_money: 123,
        },
        {
            id: 10,
            total_price: 9283942,
            shipping_money: 123,
        },
    ];
    const totalAmount = orders.reduce((acc, order) => {
        const price = parseFloat(order.total_price);
        const shipping = parseFloat(order.shipping_money);
        return acc + (price + shipping);
    }, 0);
    return (
        <>
            <div className="container mx-auto px-4 mx-[10px] my-[20px] p-4 font-karla w-[100%]">
                <div className="flex items-start">
                    <div className="w-full">
                        <div className="flex items-center w-full">
                            <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-800 p-1.5 flex items-center justify-center rounded-full">
                                <span className="text-sm text-white font-bold">1</span>
                            </div>
                            <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-800"></div>
                        </div>
                        <div className="mt-2 mr-4">
                            <h6 className="text-sm font-bold text-gray-800">Shipping</h6>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex items-center w-full">
                            <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-800 p-1.5 flex items-center justify-center rounded-full">
                                <span className="text-sm text-white font-bold">2</span>
                            </div>
                            <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
                        </div>
                        <div className="mt-2 mr-4">
                            <h6 className="text-sm font-bold text-gray-800">Billing</h6>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-200 p-1.5 flex items-center justify-center rounded-full">
                                <span className="text-sm text-white font-bold">3</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h6 className="text-sm font-bold text-gray-300">Confirm</h6>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-between'>
                    <div className="bg-white shadow-lg flex flex-col w-1/3 h-1/3">
                        <div className="text-light-blue p-4 min-h-[420px] flex flex-col">
                            <div className="flex border-b border-gray-200 pb-3 mb-4 items-center justify-center">
                                <h6 style={{ fontFamily: 'Lora, cursive' }} className="text-xl font-semibold text-[#546869] text-[26px]">Tổng hóa đơn</h6>
                            </div>
                            <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                                {orders.map((order, index) => (
                                    <div className="space-y-2" key={index}>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="font-normal text-gray-500 dark:text-gray-400">Hóa đơn #MH{order.id}</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white">{Number(order.total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="font-normal text-gray-500 dark:text-gray-400">Phí vận chuyển</dt>
                                            <dd className="text-base font-medium text-green-500">+{Number(order.shipping_money).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                        </dl>
                                    </div>
                                ))}
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd className="text-lg font-bold text-gray-900 dark:text-white">{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 p-4">
                        {clientSecret && (
                            <div className='flex justify-center'>
                                <Elements stripe={stripePromise} options={{ clientSecret }} className='flex items-center justify-center'>
                                    <CheckoutForm />
                                </Elements>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Checkout;
