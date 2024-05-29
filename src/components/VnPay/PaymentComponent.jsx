import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
    const [amount, setAmount] = useState(0);
    const [orderDescription, setOrderDescription] = useState('');
    const [orderType, setOrderType] = useState('');
    const [language, setLanguage] = useState('vn');
    const [bankCode, setBankCode] = useState(null)
    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/user/create_payment_url', {
                amount,
                orderDescription,
                orderType,
                language,
                bankCode
            });
            if (response.data && response.data.data) {
                window.location.href = response.data.data;
            }
        } catch (error) {
            console.error('Payment Error:', error);
        }
    };

    return (
        <div>
            <h1>VNPay Payment</h1>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Order Description"
                value={orderDescription}
                onChange={(e) => setOrderDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Order Type"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
            />
            <input
                type="text"
                placeholder="Order Description"
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
            />
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="vn">Vietnamese</option>
                <option value="en">English</option>
            </select>
            <button onClick={handlePayment}>Pay with VNPay</button>
        </div>
    );
};

export default PaymentComponent;
