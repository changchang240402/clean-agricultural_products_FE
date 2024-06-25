import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import { handleUnauthorized } from "./AuthService";

function reviewService() {
    const reviewProduct = {
        async getReviewData(id, type) {
            try {
                const queryParams = new URLSearchParams({
                    id: id,
                    type: type,
                });
                const response = await api.get(`/auth/reviews?${queryParams}`);
                if (response.status === 200) {
                    return {
                        data: response.data.review.review,
                        star: response.data.review.star.star,
                        totalStart: response.data.review.star.totalStart
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
                    };
                }
            }
        }
    };
    const createReview = {
        async getReviewData(type, type_id, star, content) {
            try {
                const queryParams = new URLSearchParams({
                    review_type: type,
                    review_id: type_id,
                    number_star: star,
                    content: content
                });
                const response = await api.post(`/auth/review?${queryParams}`);
                if (response.status === 200) {
                    Toastify.success("Đánh giá thành công");
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
        reviewProduct,
        createReview
    };
};

export default reviewService;