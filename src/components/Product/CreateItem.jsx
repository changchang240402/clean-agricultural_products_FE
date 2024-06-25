import React, { useState, useEffect } from 'react';
import camera from '../../assets/camera.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import itemService from '../../services/ItemService';
import Loading from '../Loading/Loading';
import { Button, Label2, Component, LabelError, Component2, Component3 } from '../Components';
import { yupResolver } from "@hookform/resolvers/yup";
import productService from '../../services/ProductService';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const CreateItem = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { apiUploadImages, schema, createItem } = itemService();
    const [id, setId] = useState('');
    const { handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { listProduct } = productService();
    const [image, setImage] = useState('');
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const data = await listProduct();
            setProducts(data.product)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleFileChange = async (e) => {
        setIsLoading(true)
        const response = await apiUploadImages(e.target.files[0])
        setIsLoading(false)
        setImage(response);
    };
    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        setId(selectedId);
        setValue('product_id', selectedId, { shouldValidate: true });
        const select = products.find(item => item.id == selectedId);
        setProduct(select);
    };
    const price = watch("price", 0);
    const type = watch("type", 0);
    const [priceType, setPrice] = useState(0);
    useEffect(() => {
        const priceValue = parseFloat(price) || 0;
        const typeValue = parseFloat(type) || 0;
        const priceTypeValue = priceValue * typeValue;
        setPrice(priceTypeValue);
    }, [price, type, setValue]);
    const handleCancel = () => {
        reset();
    };
    const formSubmit = async (data) => {
        const { item_name, product_id, describe, total, price, type } = data;
        try {
            await createItem(item_name, product_id, describe, total, price, type, priceType, image);
        } catch (error) {
            alert("Đã xảy ra lỗi không mong muốn.");
            console.error("Error submitting form:", error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(formSubmit)} className="pt-8">
                <div className='flex flex-row items-center justify-between mr-3'>
                    <h3 style={{ fontFamily: 'Lora, cursive' }} className="text-4xl font-medium text-[#65B599]">Đăng sản phẩm</h3>
                    <Link
                        to="/seller/item" className="rounded-3xl px-2 py-2 font-bold text-white inline-flex justify-center border border-green-200 bg-white text-sm font-medium text-green-900 hover:bg-green-100 hover:text-green-700 focus:outline-none focus:ring-4 focus:ring-gray-100">
                        <FontAwesomeIcon icon={faArrowRight} size='2xl' className="ml-1" color={'green'} />
                    </Link>
                </div>
                <div className="flex flex-row px-4 font-karla mt-6">
                    <div className="space-y-2 w-2/3 flex flex-col">
                        <h3 style={{ fontFamily: 'Karla, cursive' }} className="text-3xl font-medium text-[#65B599]">Thông tin mô tả</h3>

                        <div className='flex flex-col'>
                            <Label2 name='product_id' title='Loại sản phẩm:' className='p-2' />
                            <select className='border bg-white rounded-2xl p-2 border-2 focus:border-[#546869] h-[45px] w-1/2 selectpicker'
                                type="product_id"
                                id="product_id"
                                name="product_id"
                                value={id}
                                onChange={handleSelectChange}
                            >
                                <option value=''>--Chọn loại sản phẩm--</option>
                                {products?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.product_name}</option>
                                ))}
                            </select>
                        </div>
                        {errors?.product_id && (
                            <LabelError name='product_id' error={errors.product_id?.message} />
                        )}
                        <div className='border mb-5 p-3 text-justify border-gray-300 bg-[#F2D7B8] text-[#856404] rounded-md'>
                            <p className='font-semibold text-lg'>Lưu ý về giá loại sản phẩm</p>
                            <ul className='list-disc pl-5'>
                                {product ? (
                                    <li>Giá thị trường của {product.product_name} hiện nay trong khoảng {Number(product.price_min).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/kg ~
                                        {Number(product.price_max).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/kg
                                    </li>
                                ) : (
                                    <li>Chọn một sản phẩm để xem giá</li>
                                )}
                            </ul>
                        </div>
                        <Component2 name='item_name' title='Tiêu đề sản phẩm:' placeholder='Nhập tiêu đề sản phẩm'
                            className1='p-2'
                            register={register("item_name")}
                            error={errors?.item_name} />
                        <Component3 name='price' title='Giá sản phẩm:' placeholder='Nhập giá sản phẩm'
                            className='w-1/2'
                            className1='p-2'
                            className2='w-[100%]'
                            register={register("price")}
                            unit='VND/kg'
                            error={errors?.price} />
                        <Component3 name='type' title='Khối lượng cho mỗi lượt bán:' placeholder='Khối lượng trên 50kg'
                            className='w-1/2'
                            className1='p-2'
                            className2='w-[100%]'
                            register={register("type")}
                            unit='kg'
                            error={errors?.type} />
                        <div className="flex flex-col mt-2 w-1/2">
                            <Label2 name={'price_type'} title={'Giá bán:'} className={'p-2'} />
                            <div className='flex items-center'>
                                <input
                                    className="rounded-tl-2xl rounded-bl-2xl px-4 py-3 shadow-sm border-2 bg-white w-[100%]"
                                    type={'price_type'}
                                    value={priceType}
                                    id={'price_type'}
                                    name={'price_type'}
                                    readOnly={true}
                                />
                                {'VND' && <span className='px-3 py-3 shadow-sm border-4 flex items-center justify-center rounded-tr-2xl rounded-br-2xl bg-gray-200'>VND</span>}
                            </div>
                        </div>
                        <Component3 name='total' title='Khối lượng sản phẩm hiện có: ' placeholder='Nhập khối lượng'
                            className='w-1/2'
                            className1='p-2'
                            className2='w-[100%]'
                            register={register("total")}
                            unit='kg'
                            error={errors?.total} />
                    </div>
                    <div className="space-y-2 w-1/2 flex flex-col justify-center items-center ">
                        <div className='w-[500px] h-[500px] rounded-md outline outline-1 outline-offset-2 outline-[#1E40AF] flex items-center justify-center'>
                            {isLoading
                                ?
                                <Loading />
                                : <img src={image ? image : camera} alt="selected" className="w-[490px] h-[490px]" />}
                        </div>
                        <label style={{ fontFamily: 'Lora, cursive' }} className="flex items-center justify-center w-1/4 border border-blue-800 me-2 mt-1.5 inline-flex items-center rounded bg-white px-2.5 py-0.5 text-sl font-medium text-blue-800" >
                            <FontAwesomeIcon icon={faImage} size="2xl" className="mr-3" color={'gray'} /> Tải ảnh lên
                            <input type="file" id='file' hidden onChange={handleFileChange} />
                        </label>
                        <div className='border mt-8 p-3 text-justify border-gray-300 bg-[#ffeeba] text-[#856404] rounded-md'>
                            <p className='font-semibold text-lg'>Lưu ý khi đăng sản phẩm</p>
                            <ul className='list-disc pl-5'>
                                <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
                                <li>Hình ảnh chân thực và đúng loại sản phẩm đang bán.</li>
                                <li>Cần tăng độ tin cậy trong phần mô tả bạn nên viết chi tiết về sản phẩm của mình.</li>
                                <li>Giá cả sản phẩm bạn bán nên theo giá thị trường hiện tại.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <Label2 name={'describe'} title={'Nội dung mô tả:'} className={'p-5 mt-5'} />
                    <div className="flex items-center justify-center">
                        <textarea
                            id="describe"
                            cols="30" rows="10"
                            className='w-[95%] px-8 py-6 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#546869] bg-white'
                            name="describe"
                            {...register("describe")}
                        ></textarea>
                    </div>
                    {errors?.describe && (
                        <LabelError name='describe' error={errors.describe?.message} />
                    )}
                </div>
                <div className="flex justify-end mt-6 text-center mb-5">
                    <button className="w-[100px] inline-flex justify-center rounded-lg border border-[#FFA800] bg-white px-3 py-3 text-2sm font-bold text-[#FFA800] hover:bg-orange-100 hover:text-[#FFA800] focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 mr-8" type="button" onClick={handleCancel}>
                        Hủy
                    </button>
                    <button className="w-[150px] inline-flex justify-center rounded-lg border border-blue-200 bg-white px-3 py-3 text-2sm font-bold text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 mr-8" type="submit">
                        Tạo sản phẩm
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateItem;