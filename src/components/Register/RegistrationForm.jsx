import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { Component, Label, LabelError } from "../Components";
import { faArrowRotateLeft, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const schema = yup.object({
    email: yup.string()
        .email('Email phải hợp lệ')
        .required('Không được để trống')
        .max(50, 'Email dài tối đa 50 ký tự'),
    password: yup.string()
        .required('Không được để trống')
        .min(8, 'Mật khẩu phải dài tối thiểu 8 ký tự')
        .max(20, 'Mật khẩu phải dài tối đa 50 ký tự'),
    confirm_password: yup.string()
        .required('Không được để trống')
        .oneOf([yup.ref('password'), null], 'Mật khẩu phải trùng khớp')
        .min(8).max(20),
})

const RegistrationForm = ({ userData, setUserData, nextStep }) => {
    const { handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const { login } = AuthService();

    const formSubmit = async (data) => {
        const { email, password, confirm_password } = data;
        setUserData({ ...userData, email, password, confirm_password });
        nextStep();
    };

    return (
        <form
            className="form flex flex-col"
            onSubmit={handleSubmit(formSubmit)}
        >
            <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">
                Chào mừng bạn đã đến với chúng tôi
            </p>
            <Component name='email' title='Email' placeholder='abc@gmail.com'
                register={register("email", { value: userData.email })}
                error={errors?.email} />
            <Component name='password' title='Mật khẩu' placeholder='abcd1234'
                className1='mt-5'
                register={register("password", { value: userData.password })}
                error={errors?.password} />
            <div className="flex flex-col">
                <Label className='mt-5' name='confirm_password' title='Xác nhận mật khẩu' />
                <input
                    className="px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:border-[#546869] bg-white"
                    type="password"
                    placeholder="abcd1234"
                    id="confirm_password"
                    name="confirm_password"
                    {...register("confirm_password", { value: userData.confirm_password })}
                />
                {errors?.confirm_password && (
                    <LabelError name={confirm_password} error={errors?.confirm_password.message} />
                )}
            </div>
            <div className="flex justify-between mt-10 text-center">
                <Link to="/" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                    <FontAwesomeIcon icon={faArrowRotateLeft} className="mr-3" />
                    Đăng nhập
                </Link>
                <button type="submit" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                    Tiếp theo
                    <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
                </button>
            </div>
        </form>
    );
}

export default RegistrationForm;