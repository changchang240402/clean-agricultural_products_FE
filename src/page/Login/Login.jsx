import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Background from "../../components/Logo/Background";
import Logo from "../../components/Logo/Logo";
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { Component } from "../../components/Components";
const schema = yup.object({
    email: yup.string()
        .email('Email phải hợp lệ')
        .required('Không được để trống')
        .max(50,'Email dài tối đa 50 ký tự'),
    password: yup.string()
        .required('Không được để trống')
        .min(8,'Mật khẩu phải dài tối thiểu 8 ký tự')
        .max(20,'Mật khẩu phải dài tối đa 50 ký tự'),
})

const Login = () => {
    const { login } = AuthService();

    const { handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const formSubmit = async (data) => {
        const { email, password } = data;
        login(email, password);
    };

    return (
        <div className="flex z-10">
            <div className=" flex flex-col justify-center items-center flex-1 h-screen bg-white font-poppins">
                <div className="container rounded-3xl m-10 shadow-xl bg-white w-1/2 ">
                    <div className="m-10">
                        <div className="flex justify-start my-5 items-start">
                            <Logo size='50' />
                        </div>
                        <form
                            className="form flex flex-col"
                            onSubmit={handleSubmit(formSubmit)}
                        >
                            <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">
                                Chào mừng bạn trở lại
                            </p>
                            <Component name='email' title='Email' placeholder='abc@gmail.com'
                                register={register("email")}
                                error={errors?.email} />
                            <Component name='password' title='Mật khẩu' placeholder='abcd1234'
                                className1='mt-12'
                                register={register("password")}
                                error={errors?.password} />
                            <div className="flex justify-center mt-16 text-center">
                                <button className="bg-[#72E9C0] rounded-3xl px-6 py-3 font-bold text-white">
                                    ĐĂNG NHẬP
                                </button>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                                <div style={{ fontFamily: 'Lobster, cursive' }} className="font-medium text-lg mb-2 text-[#546869]">
                                    Bạn chưa có tài khoản ?
                                    <Link to="/register" className="text-gray-900 ml-1">Đăng ký tại đây</Link>
                                </div>
                                <div style={{ fontFamily: 'Lobster, cursive' }} className="font-medium text-lg mb-2 text-[#546869]">
                                    <a href="#">
                                        Quên mật khẩu
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Background />
        </div>
    );
}

export default Login;
