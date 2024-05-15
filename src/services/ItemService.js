import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import { handleUnauthorized } from "./AuthService";

function itemService() {

    const topItem = async () => {
        try {
            const response = await api.get(`/user/topItems`);
            if (response.status === 200) {
                return {
                    item: response.data.item,
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
    const newItem = async () => {
        try {
            const response = await api.get(`/user/newItems`);
            if (response.status === 200) {
                return {
                    item: response.data.item,
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
    const itemToUser = {
        async getItemData(page, search, productId, priceSort) {
            try {
                const queryParams = new URLSearchParams({
                    page: page + 1,
                    name: search,
                    product_id: productId,
                    sort: priceSort
                });
                const response = await api.get(`/user/items?${queryParams}`);
                if (response.status === 200) {
                    return {
                        data: response.data.item.data,
                        total_pages: response.data.item.last_page,
                        total: response.data.item.total
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

                    return {
                        data: [],
                        total_pages: 0,
                        total: 0
                    };
                }
            }
        }
    };
    return {
        topItem,
        newItem,
        itemToUser,
    };
};

export default itemService;