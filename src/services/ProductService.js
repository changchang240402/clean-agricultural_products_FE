import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import { handleUnauthorized } from "./AuthService";
import { useNavigate } from "react-router-dom";
function productService() {
    const navigate = useNavigate();
    const productType = {
        async getProductData(id) {
            try {
                const response = await api.get(`/auth/products/${id}`);
                if (response.status === 200) {
                    return {
                        product: response.data.product,
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
        }
    };

    const listProduct = async () => {
        try {
            const response = await api.get(`/seller/listProduct`);
            if (response.status === 200) {
                return {
                    product: response.data.product,
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
    const productList = {
        async getProductData(page, id, sort) {
            try {
                const queryParams = new URLSearchParams({
                    page: page + 1,
                    product_type_id: id,
                    sort: sort
                });
                const response = await api.get(`/auth/products?${queryParams}`);
                if (response.status === 200) {
                    return {
                        data: response.data.product.data,
                        total_pages: response.data.product.last_page,
                        total: response.data.product.total
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
    const updateProduct = async (id, product_name, price_min, price_max) => {
        try {
            const response = await api.put(`/admin/updateProduct/${id}`, {
                product_name,
                price_min,
                price_max,
            });
            if (response.status === 200) {
                Toastify.success("Điều chỉnh thông tin thành công")
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
        productType,
        productList,
        listProduct,
        updateProduct
    };
};

export default productService;
