import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import { handleUnauthorized } from "./AuthService";
import { useNavigate } from "react-router-dom";
function orderDetailService() {
    const navigate = useNavigate();
    const getOrderByUser = async () => {
        try {
            const response = await api.get(`/user/orders`);
            if (response.status === 200) {
                return {
                    order: response.data.order,
                };
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    handleUnauthorized();
                }
                Toastify.error(error.response.data.message);
            } else {
                Toastify.error("An unexpected error occurred.");
            }
        }
    };

    const createOrderDetail = {
        async getOrderDetailData(item_id, seller_id, count) {
            try {
                const queryParams = new URLSearchParams({
                    item_id: item_id,
                    seller_id: seller_id,
                    count: count
                });
                const response = await api.post(`/user/orderDetail?${queryParams}`);
                if (response.status === 200) {
                    Toastify.success("Đơn hàng đã thêm vô giỏ hàng");
                    navigate('/user/cart');
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        handleUnauthorized();
                    }
                    Toastify.error(error.response.data.message);
                } else {
                    Toastify.error("Đã xảy ra lỗi không mong muốn.");
                }
            }
        }
    };

    const editOrderDetailByUser = {
        async getOrderDetailData(id, count) {
            try {
                const queryParams = new URLSearchParams({
                    count: count
                });
                const response = await api.post(`/user/orderDetail/${id}?${queryParams}`);
                if (response.status === 200) {
                    Toastify.success("Cập nhập thành công");
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 500);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        handleUnauthorized();
                    }
                    Toastify.error(error.response.data.message);
                } else {
                    Toastify.error("An unexpected error occurred.");
                }
            }
        }
    }
    const deleteOrderDetailByUser = {
        async getOrderDetailData(id) {
            try {
                const response = await api.delete(`/user/orderDetail/${id}`);
                if (response.status === 200) {
                    // Toastify.success("Cập nhập thành công");
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        handleUnauthorized();
                    }
                    Toastify.error(error.response.data.message);
                } else {
                    Toastify.error("An unexpected error occurred.");
                }
            }
        }
    }
    const deleteOrderByUser = {
        async getOrderData(id) {
            try {
                const response = await api.delete(`/user/order/${id}`);
                if (response.status === 200) {
                    // Toastify.success("Cập nhập thành công");
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        handleUnauthorized();
                    }
                    Toastify.error(error.response.data.message);
                } else {
                    Toastify.error("An unexpected error occurred.");
                }
            }
        }
    }
    return {
        createOrderDetail,
        getOrderByUser,
        editOrderDetailByUser,
        deleteOrderDetailByUser,
        deleteOrderByUser
    };
};

export default orderDetailService;