import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { Component, LabelError, Label } from "../Components";
import { faArrowRotateLeft, faArrowRight, faArrowLeft, faCalendar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utility/formatdate";

const schema = yup.object({
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
    birthday1: yup.date()
        .typeError('Giá trị không hợp lệ')
        .required('Không được để trống')
        .min(new Date(new Date().getFullYear() - 55, new Date().getMonth(), new Date().getDate()), 'Bạn phải dưới 55 tuổi')
        .max(new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()), 'Bạn phải đủ 18 tuổi trở lên'),
    license_plates: yup.string()
        .matches(/^\d{2}[A-Z]{1}-\d{3}\.\d{2}$/, 'Biển số xe không hợp lệ')
        .required('Không được để trống'),
    driving_license_number: yup.string()
        .matches(/^\d+$/, 'Số giấy phép lái xe chỉ được chứa số')
        .required('Không được để trống')
        .min(12, 'Số giấy phép lái xe phải chứa 12 số')
        .max(12, 'Số giấy phép lái xe không được quá 12 số'),
    vehicles: yup.string()
        .required('Không được để trống')
        .max(50, 'Tên dài tối đa 50 ký tự'),
    payload: yup.number()
        .typeError('Giá trị không hợp lệ')
        .required('Không được để trống')
        .min(100, 'Khối lượng hàng hóa tối thiểu phải chứa trên 100 kg')
        .max(10000, 'Khối lượng hàng hóa tối đa không được quá 10000 kg'),
})

const TraderRegistrationForm = ({ userData, setUserData, handleRegister, prevStep }) => {
    const [userDataUpdated, setUserDataUpdated] = useState(false);
    const [birthday1, setBirthday] = useState(null);
    const { handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });
    const formSubmit = async (data) => {
        const { name, phone, address, birthday1, license_plates, driving_license_number, vehicles, payload } = data;
        const status = 0;
        const birthday = formatDate(birthday1);
        setUserData({ ...userData, name, phone, address, birthday, license_plates, driving_license_number, vehicles, payload, status });
        // handleRegister();
    };
    useEffect(() => {
        if (userDataUpdated) {
            handleRegister();
        }
    }, [userDataUpdated]);

    useEffect(() => {
        if (userData.name && userData.phone && userData.address && userData.birthday && userData.license_plates && userData.driving_license_number && userData.vehicles && userData.payload) {
            setUserDataUpdated(true);
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
            <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl font-semibold">
                Hãy cho chúng tôi biết thêm thông tin về bạn
            </p>
            <Component name='name' title='Tên của bạn' placeholder='Nguyễn Văn A'
                register={register("name")}
                error={errors?.name} />
            <div className="flex flex-row justify-start">
                <div className="flex flex-col justify-end w-1/2">
                    <Label name='birthday1' title='Ngày sinh' />
                    <div className='flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#546869] bg-white w-[200px] h-[45px]'>
                        <DatePicker
                            selected={birthday1}
                            onChange={(date) => {
                                setBirthday(date);
                                setValue('birthday1', date, { shouldValidate: true });
                            }}
                            className='focus:outline-none focus:border-none w-[150px]'
                            placeholderText="01/01/1999"
                        />
                        <FontAwesomeIcon
                            icon={faCalendar}
                            size="xl"
                            className='c-[#387DE4]'
                        />
                    </div>
                    {errors?.birthday1 && (
                        <LabelError name={birthday1} error={errors?.birthday1.message} />
                    )}
                </div>
                <Component name='phone' title='Số điện thoại' placeholder='0912345678'
                    className='w-1/2'
                    register={register("phone")}
                    error={errors?.phone} />
            </div>
            <Component name='address' title='Địa chỉ' placeholder='Số nhà, đường, phường xã, quận huyện, tỉnh thành phố'
                register={register("address")}
                error={errors?.address} />
            <Component name='driving_license_number' title='Số giấy phép lái xe' placeholder='091234567801'
                register={register("driving_license_number")}
                error={errors?.driving_license_number} />
            <div className="flex flex-row justify-start mt-1">
                <Component name='license_plates' title='Biển số xe' placeholder='35A-123.45'
                    className='w-1/2'
                    className2='w-4/5'
                    register={register("license_plates")}
                    error={errors?.license_plates} />
                <Component name='vehicles' title='Dòng xe tải' placeholder='Isuzu QKR230'
                    className='w-1/2'
                    register={register("vehicles")}
                    error={errors?.vehicles} />
            </div>
            <Component name='payload' title='Khối lượng hàng hóa tối đa xe bạn chở được (đơn vị: kg)' placeholder='1000'
                register={register("payload")}
                error={errors?.payload} />
            <div className="flex justify-between mt-6 text-center">
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

export default TraderRegistrationForm;