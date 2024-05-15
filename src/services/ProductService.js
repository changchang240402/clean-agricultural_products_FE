import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import { handleUnauthorized } from "./AuthService";

function productService() {

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
    return {
        productType,
    };
};

export default productService;
