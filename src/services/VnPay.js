import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import { handleUnauthorized } from "./AuthService";
function VnPay() {
    const payment = async (vnp_TxnRef, vnp_Amount) => {
        try {
            const response = await api.post('/user/create_payment_url', {
                vnp_TxnRef,
                vnp_Amount,
            });
            if (response.data && response.data.data) {
                window.location.href = response.data.data;
            }
        } catch (error) {
            console.error('Payment Error:', error);
        }
    }
    const fetchVnPayReturn = async (queryString) => {
        try {
            const response = await api.get(`/user/vnpay_return?${queryString}`);
            if (response.status === 200) {
                return {
                    data: response.data.data,
                };
            }
            if (response.status === 401) {
                Toastify.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching VNPay return:', error);
        }
    };
    const updateBill = async () => {
        try {
            const response = await api.post("/user/updateBill");
            if (response.status === 200) {
                Toastify.success("Thông báo đã được gửi đến người bán");
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }
    return {
        payment,
        fetchVnPayReturn,
        updateBill
    };
};

export default VnPay;
