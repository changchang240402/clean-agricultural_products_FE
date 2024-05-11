import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { Component } from "../Components";
import React, { useEffect } from 'react';
import { faArrowRotateLeft, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const SellerRegistrationForm = ({ userData, setUserData, handleRegister, prevStep }) => {
    const { schema } = AuthService();
    const { handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const formSubmit = async (data) => {
        const { name, phone, address } = data;
        const status = 1;
        setUserData({ ...userData, name, phone, address, status });
    };
    useEffect(() => {
        if (userData.name && userData.phone && userData.address && userData.status) {
            handleRegister();
        }
    }, [userData]);
    const handleBack = () => {
        prevStep();
    };

    return (
        <form
            className="form flex flex-col"
            onSubmit={handleSubmit(formSubmit)}
        >
            <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">
                Hãy cho chúng tôi biết thêm thông tin về bạn
            </p>
            <Component name='name' title='Tên cửa hàng' placeholder='Thực phẩm sạch'
                register={register("name")}
                error={errors?.name} />
            <Component name='phone' title='Số điện thoại' placeholder='0912345678'
                className1='mt-5'
                register={register("phone")}
                error={errors?.phone} />
            <Component name='address' title='Địa chỉ' placeholder='Số nhà, đường, phường xã, quận huyện, tỉnh thành phố'
                className1='mt-5'
                register={register("address")}
                error={errors?.address} />
            <div className="flex justify-between mt-10 text-center">
                <button className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white" onClick={handleBack}>
                    Quay lại
                    <FontAwesomeIcon icon={faArrowLeft} className="ml-3" />
                </button>
                <button type="submit" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                    Đăng ký
                </button>
            </div>
        </form>
    );
}

export default SellerRegistrationForm;