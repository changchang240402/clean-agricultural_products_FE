import { useNavigate } from "react-router-dom";
import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { ROLE } from "../const/config"
import * as yup from "yup";
export const handleUnauthorized = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    window.location.href = "/";
};
function AuthService() {
    const schema = yup.object().shape({
        name: yup.string()
            .required('Không được để trống')
            .max(50, 'Tên dài tối đa 50 ký tự'),
        phone: yup.string()
            .matches(/^\d+$/, 'Số điện thoại chỉ được chứa số')
            .required('Không được để trống')
            .min(10, 'Số điện thoại phải chứa 10 số')
            .max(10, 'Số điện thoại không được quá 10 số'),
        address: yup.string()
            .required('Không được để trống')
            .min(40, 'Hãy nhập địa chỉ chính xác'),
    })
    const navigate = useNavigate();
    const regiter = async (
        email,
        password,
        confirm_password,
        role,
        name,
        phone,
        address,
        birthday,
        license_plates,
        driving_license_number,
        vehicles,
        payload,
        status
    ) => {
        try {
            const response = await api.post("/auth/register", {
                email,
                password,
                confirm_password,
                role,
                name,
                phone,
                address,
                birthday,
                license_plates,
                driving_license_number,
                vehicles,
                payload,
                status
            });
            if (response.status === 200) {
                Toastify.success("Đăng ký thành công");
                const status = response.data.data.status;
                switch (status) {
                    case 0:
                        navigate('/popup');
                        break;
                    case 1:
                        navigate('/');
                        break;
                    default:
                        Toastify.error('Status không xác định:', status);
                }
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            } else {
                Toastify.error("Đã xảy ra lỗi không mong muốn.");
            }
        }
    };
    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            if (response.status === 200) {

                Toastify.success("Đăng nhập thành công");

                localStorage.setItem("accessToken", response.data.access_token);
                localStorage.setItem("refreshToken", response.data.refresh_token);
                localStorage.setItem("userName", response.data.user.name);
                localStorage.setItem("userRole", response.data.user.role);
                const role = response.data.user.role;
                switch (role) {
                    case ROLE.admin:
                        navigate('/admin');
                        break;
                    case ROLE.user:
                        navigate('/user');
                        break;
                    case ROLE.seller:
                        navigate('/seller');
                        break;
                    case ROLE.trader:
                        navigate('/trader');
                        break;
                    default:
                        Toastify.error('Role không xác định:', role);
                }
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    };

    const logout = async () => {
        try {
            const response = await api.post("/auth/logout");
            if (response.status === 200) {
                handleUnauthorized();
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await api.get("/auth/me");
            if (response.status === 200) {
                return response.data.user;
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

    return {
        regiter,
        login,
        logout,
        getUserProfile,
        schema,
    };
}

export default AuthService;
