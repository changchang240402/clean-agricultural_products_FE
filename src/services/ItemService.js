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

    const listItem = {
        async getItemData(page, search, status) {
            try {
                const queryParams = new URLSearchParams({
                    page: page + 1,
                    name: search,
                    status: status,
                });
                const response = await api.get(`/auth/items?${queryParams}`);
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
    const itemDetail = {
        async getItemData(id) {
            try {
                const response = await api.get(`/auth/item/${id}`);
                if (response.status === 200) {
                    return {
                        item: response.data.item,
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
    const itemWarning = async () => {
        try {
            const response = await api.post(`/admin/itemWarning`);
            if (response.status === 200) {
                Toastify.success("Đã gửi thông báo cảnh báo");
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

    const itemBan = async () => {
        try {
            const response = await api.post(`/admin/itemBan`);
            if (response.status === 200) {
                Toastify.success("Đã khóa các sản phẩm");
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

    const itemUnBan = async () => {
        try {
            const response = await api.post(`/admin/itemUnban`);
            if (response.status === 200) {
                Toastify.success("Đã mở các sản phẩm");
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

    const itemShop = {
        async getItemShopData(id) {
            try {
                const response = await api.get(`/user/itemShop/${id}`);
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
                    // Toastify.error(error.response.data.message);
                } else {
                    Toastify.error("An unexpected error occurred.");

                    return {
                        item: [],
                    };
                }
            }
        }
    };
    return {
        topItem,
        newItem,
        itemToUser,
        itemDetail,
        itemShop,
        listItem,
        itemWarning,
        itemBan,
        itemUnBan
    };
};

export default itemService;