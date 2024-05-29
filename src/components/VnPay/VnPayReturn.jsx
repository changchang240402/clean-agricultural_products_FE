import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VnPayReturn = ({ location }) => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchVnPayReturn = async () => {
            const query = new URLSearchParams(location.search);
            try {
                const response = await axios.get(`http://localhost:8000/vnpay_return?${query.toString()}`);
                setResult(response.data);
            } catch (error) {
                console.error('Error fetching VNPay return:', error);
            }
        };
        fetchVnPayReturn();
    }, [location.search]);

    return (
        <div>
            <h1>VNPay Return</h1>
            {result ? (
                <div>
                    <p>{result.message}</p>
                    <pre>{JSON.stringify(result.data, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default VnPayReturn;
