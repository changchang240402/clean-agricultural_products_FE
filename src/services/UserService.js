import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import { handleUnauthorized } from "./AuthService";

function userService() {

    const shop = {
        async getShopData(search, address) {
            try {
                const queryParams = new URLSearchParams({
                    name: search,
                    address: address,
                });
                const response = await api.get(`/user/shops?${queryParams}`);
                if (response.status === 200) {
                    return {
                        shop: response.data.shop.shops,
                        total: response.data.shop.count,
                    };
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        handleUnauthorized();
                    }
                    // Toastify.error(error.response.data.message);
                } else {
                    Toastify.error("An unexpected error occurred.");
                }

                return {
                    shop: [],
                    total: 0
                };
            }
        }
    };
    const shopDetail = {
        async getShopData(id) {
            try {
                const response = await api.get(`/auth/shop/${id}`);
                if (response.status === 200) {
                    return {
                        shop: response.data.shop,
                    };
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 500) {
                        handleUnauthorized();
                    }
                    Toastify.error(error.response.data.message);
                } else {
                    Toastify.error("An unexpected error occurred.");
                }
            }
        }
    };
    return {
        shop,
        shopDetail
    };
};

export default userService;
