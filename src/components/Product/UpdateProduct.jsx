import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Component3 } from '../Components';
import productService from '../../services/ProductService';
const schema = yup.object({
    price_min: yup.number()
        .typeError('Giá trị không hợp lệ')
        .required('Không được để trống')
        .min(1000, 'Giá tối thiểu là 1000 đồng'),
    price_max: yup.number()
        .typeError('Giá trị không hợp lệ')
        .required('Không được để trống')
        .min(1000, 'Giá tối thiểu là 1000 đồng')
        .min(yup.ref('price_min'), 'Giá cao nhất của bạn phải lớn hơn giá thấp nhất'),
})
const UpdateProduct = ({ isOpen, onClose, product }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
    });
    const { updateProduct } = productService();
    useEffect(() => {
        if (product) {
            reset({
                price_min: parseFloat(product.price_min),
                price_max: parseFloat(product.price_max),
            });
        }
    }, [product, reset]);

    const onSubmit = async (data) => {
        const { price_min, price_max } = data;
        try {
            await updateProduct(product.id, product.product_name, price_min, price_max);
            window.dispatchEvent(new CustomEvent('productUpdated', { detail: { productId: product.id, price_min, price_max } }));
        } catch (error) {
            alert("Đã xảy ra lỗi không mong muốn.");
            console.error("Error submitting form:", error);
        }
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
            <div className="bg-white rounded shadow-lg w-1/2 max-w-lg">
                <div className="flex flex-row justify-between border-b px-4 py-2">
                    <h3 className="text-2xl font-medium text-[#65B599]">Cập nhập giá thị trường loại sản phẩm</h3>
                    <button className="border bg-red-600 h-[20px] w-[20px] text-white" onClick={handleClose}>X</button>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3 style={{ fontFamily: 'Lora, cursive' }} className='flex items-center justify-center'>{product.product_name}</h3>
                        <Component3 name='price_min' title='Giá thấp nhất:' placeholder='Nhập giá sản phẩm'
                            className1='p-2'
                            className2='w-[100%]'
                            register={register("price_min")}
                            unit='VND/kg'
                            error={errors?.price_min} />
                        <Component3 name='price_max' title='Giá cao nhất:' placeholder='Nhập giá sản phẩm'
                            className1='p-2'
                            className2='w-[100%]'
                            register={register("price_max")}
                            unit='VND/kg'
                            error={errors?.price_max} />
                        <div className="flex justify-end border-t mt-5">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="mr-3 w-full lg:w-1/5 inline-flex justify-center rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-orange-900 hover:bg-orange-100 hover:text-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-100"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="w-full lg:w-1/5 inline-flex justify-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            >
                                Điều chỉnh
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;