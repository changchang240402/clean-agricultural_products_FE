import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import { handleUnauthorized } from "./AuthService";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
function itemService() {
    const navigate = useNavigate();
    const schema = yup.object({
        item_name: yup.string()
            .required('Không được để trống')
            .max(150, 'Tên dài tối đa 150 ký tự'),
        product_id: yup.number()
            .typeError('Hãy chọn loại sản phẩm')
            .required('Hãy chọn loại sản phẩm')
            .min(1, 'Không tồn tại trọng hệ thống')
            .max(59, 'Không tồn tại trọng hệ thống'),
        describe: yup.string()
            .required('Không được để trống'),
        type: yup.number()
            .typeError('Giá trị không hợp lệ')
            .required('Không được để trống')
            .min(50, 'Khối lượng hàng hóa tối thiểu phải chứa trên 100 kg'),
        total: yup.number()
            .typeError('Giá trị không hợp lệ')
            .required('Không được để trống')
            .min(100, 'Khối lượng hàng hóa tối thiểu phải chứa trên 100 kg')
            .min(yup.ref('type'), 'Khối lượng sản phẩm bán của bạn phải lớn hơn khối lượng cần bán mỗi lượt'),
        price: yup.number()
            .typeError('Giá trị không hợp lệ')
            .required('Không được để trống')
            .min(1000, 'Giá tối thiểu là 1000 đồng'),
    })
    const schema2 = yup.object({
        item_name: yup.string()
            .required('Không được để trống')
            .max(150, 'Tên dài tối đa 150 ký tự'),
        describe: yup.string()
            .required('Không được để trống'),
        type: yup.number()
            .typeError('Giá trị không hợp lệ')
            .required('Không được để trống')
            .min(50, 'Khối lượng hàng hóa tối thiểu phải chứa trên 100 kg'),
        total: yup.number()
            .typeError('Giá trị không hợp lệ')
            .required('Không được để trống')
            .min(100, 'Khối lượng hàng hóa tối thiểu phải chứa trên 100 kg')
            .min(yup.ref('type'), 'Khối lượng sản phẩm bán của bạn phải lớn hơn khối lượng cần bán mỗi lượt'),
        price: yup.number()
            .typeError('Giá trị không hợp lệ')
            .required('Không được để trống')
            .min(1000, 'Giá tối thiểu là 1000 đồng'),
    })
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
    const apiUploadImages = async (image) => {
        try {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', import.meta.env.VITE_UPLOAD_ASSETS_NAME);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.status === 200) {
                return response.data.secure_url;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const createItem = async (item_name, product_id, describe, total, price, type, price_type, image) => {
        try {
            const response = await api.post("/seller/createItem", {
                item_name,
                product_id,
                describe,
                total,
                price,
                type,
                price_type,
                image,
            });
            if (response.status === 200) {

                Toastify.success("Tạo thành công. Quản trị viên sẽ kiểm duyệt bài đăng của bạn trước khi đăng lên hệ thống.");
                navigate('/seller/item');

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
    const updateItem = async (id, item_name, product_id, describe, total, price, type, price_type, image) => {
        try {
            const response = await api.put(`/seller/updateItem/${id}`, {
                item_name,
                product_id,
                describe,
                total,
                price,
                type,
                price_type,
                image,
            });
            if (response.status === 200) {

                Toastify.success("Điều chỉnh thông tin thành công");
                navigate('/seller/item');

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
    const updateStatus = {
        async getData(id, time, status) {
            try {
                const queryParams = new URLSearchParams({
                    status: status,
                    time: time
                });
                const response = await api.post(`/auth/updateStatusItem/${id}?${queryParams}`);
                if (response.status === 200) {
                    Toastify.success("Cập nhập thành công");
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
        topItem,
        newItem,
        itemToUser,
        itemDetail,
        itemShop,
        listItem,
        itemWarning,
        itemBan,
        itemUnBan,
        apiUploadImages,
        schema,
        schema2,
        createItem,
        updateItem,
        updateStatus
    };
};

export default itemService;