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
    const totalOrder = async () => {
        try {
            const response = await api.get("/user/total");
            if (response.status === 200) {
                return response.data.order;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/");
            }

            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }
    const userToAdmin = {
        async getUserData(page, search, status, sort) {
            try {
                const queryParams = new URLSearchParams({
                    page: page + 1,
                    name: search,
                    status: status,
                    sort: sort
                });
                const response = await api.get(`/admin/users?${queryParams}`);
                if (response.status === 200) {
                    return {
                        data: response.data.user.data,
                        total_pages: response.data.user.last_page,
                        total: response.data.user.total
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
    const sellerToAdmin = {
        async getSellerData(page, search, status, sort) {
            try {
                const queryParams = new URLSearchParams({
                    page: page + 1,
                    name: search,
                    status: status,
                    sort: sort
                });
                const response = await api.get(`/admin/sellers?${queryParams}`);
                if (response.status === 200) {
                    return {
                        data: response.data.shop.data,
                        total_pages: response.data.shop.last_page,
                        total: response.data.shop.total
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
    const traderToAdmin = {
        async getTraderData(page, search, status, sort) {
            try {
                const queryParams = new URLSearchParams({
                    page: page + 1,
                    name: search,
                    status: status,
                    sort: sort
                });
                const response = await api.get(`/admin/traders?${queryParams}`);
                if (response.status === 200) {
                    return {
                        data: response.data.trader.data,
                        total_pages: response.data.trader.last_page,
                        total: response.data.trader.total
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
    const statistics = async () => {
        try {
            const response = await api.get(`/auth/statistic`);
            if (response.status === 200) {
                return {
                    statistic: response.data.statistic,
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
    return {
        shop,
        shopDetail,
        totalOrder,
        userToAdmin,
        sellerToAdmin,
        traderToAdmin,
        statistics
    };
};

export default userService;
