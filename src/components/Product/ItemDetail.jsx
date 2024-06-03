import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { decodeId } from '../../utility/utils';
import { Link } from "react-router-dom";
import { StarRating } from '../ratingstar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse, faCartShopping, faPlus, faSeedling, faTags, faMoneyBill1Wave, faMinus } from '@fortawesome/free-solid-svg-icons'
import Review from '../Review/Review';
import itemService from '../../services/ItemService';
import thank from '../../assets/thankyou.png'
import orderDetailService from '../../services/OrderDetailService';
const Item = () => {
    const { id } = useParams();
    const decodedId = decodeId(id);
    const [qty, setQty] = useState(1);
    const { itemDetail } = itemService();
    const [item, setItem] = useState({
        detail: {}
    });

    const { createOrderDetail } = orderDetailService();
    const fetchData = async () => {
        try {
            const data = await itemDetail.getItemData(decodedId);
            setItem(prevFilter => ({ ...prevFilter, detail: data.item }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const rating = item.detail.average_review_score;
    console.log('Rating:', rating, 'Type:', typeof rating);
    console.log('decodedId:', decodedId);
    const [showStats, setShowStats] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (rating === 0) {
            setShowStats(false);
        } else {
            setShowStats(true);
        }
        // fetchData();
    }, [rating]);
    const increaseQty = () => {
        setQty((prevQty) => {
            let newQty = prevQty + 1;
            return newQty;
        })
    }

    const decreaseQty = () => {
        setQty((prevQty) => {
            let newQty = prevQty - 1;
            if (newQty < 1) {
                newQty = 1;
            }
            return newQty;
        })
    }
    const handleAddToCart = async () => {
        try {
            await createOrderDetail.getOrderDetailData(item.detail.id, item.detail.seller_id, qty);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    return (
        <>
            {item.detail.status == 0 ? (
                <div className="container mx-auto pt-8 w-2/3">
                    <div className="flex flex-row px-4 font-karla">
                        <div className="space-y-2 w-1/2 flex justify-center">
                            <img src={item.detail.image} alt="selected" className="h-200" />
                        </div>
                        <div className="px-2 w-1/2">
                            <h2 style={{ fontFamily: 'Lora, cursive' }} className="text-3xl">{item.detail.item_name}</h2>
                            <div className="flex items-center justify-between">
                                {showStats && (
                                    <div className="">
                                        <div className='flex flex-row'>
                                            <StarRating
                                                size={24}
                                                rating={rating}
                                            />
                                            <span className="ml-1 text-xl opacity-70">{rating}</span>
                                        </div>
                                        <span className="ml-1 text-xl opacity-70">Đã bán {item.detail.total_orders}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row mb-5 mt-5">
                                <div className="text-center border-gray-200 flex justify-end items-center">
                                    <img className='rounded-3xl' loading="lazy" src={item.detail.seller_avatar} height={50} width={50} alt="" />
                                </div>
                                <div className="px-4 flex justify-center items-center">
                                    <p style={{ fontFamily: 'Lora, cursive' }} className="text-gray-500 text-[22px] font-bold mb-2">{item.detail.seller_name}</p>
                                </div>
                            </div>
                            <div className="leading-3 flex flex-col mt-4">
                                <h2 style={{ fontFamily: 'Lora, cursive' }} className="font-semibold text-blue-500 text-2xl">
                                    Giá bán: {Number(item.detail.price_type).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </h2>
                                <span style={{ fontFamily: 'Lora, cursive' }} className="text-xl font-bold mb-3 opacity-70">
                                    <FontAwesomeIcon icon={faTags} className="opacity-70 mr-2" size='sm' /> cho {item.detail.type} Kg
                                </span>
                                <span style={{ fontFamily: 'Lora, cursive' }} className="text-xl font-medium opacity-70 mb-2">
                                    <FontAwesomeIcon icon={faSeedling} className="opacity-70 mr-2" size='sm' /> {item.detail.product_name}
                                </span>
                                <span style={{ fontFamily: 'Lora, cursive' }} className="text-xl font-medium opacity-70 mb-2">
                                    <FontAwesomeIcon icon={faMoneyBill1Wave} className="opacity-70 mr-2" size='sm' />  {Number(item.detail.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/Kg
                                </span>
                                <span style={{ fontFamily: 'Lora, cursive' }} className="text-xl font-medium opacity-70 mb-2">
                                    <FontAwesomeIcon icon={faWarehouse} className="opacity-70 mr-2" size='sm' />{item.detail.total}Kg
                                </span>
                            </div>
                            <div className="flex flex-col mt-4 mb-2 space-y-4">
                                <div className="flex flex-row items-center space-x-4">
                                    <div className="flex items-center">
                                        <span style={{ fontFamily: 'Lora, cursive' }} className="font-semibold text-[#546869] text-2xl">
                                            Số lượng:
                                        </span>
                                    </div>
                                    <div className="flex border border-gray-300 rounded-md w-1/2 h-[50px] items-center justify-between px-3">
                                        <button type="button" className="text-gray-600 hover:text-gray-800 w-1/3" onClick={decreaseQty}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span className="text-center text-xl w-1/3">{qty}</span>
                                        <button type="button" className="text-gray-600 hover:text-blue-800 w-1/3" onClick={increaseQty}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center">
                                    <button type="button" className="bg-[#65B599] rounded-xl px-6 py-3 font-bold text-white flex items-center justify-center space-x-2 h-[50px]"
                                        onClick={handleAddToCart}>
                                        <FontAwesomeIcon icon={faCartShopping} className="white mr-2" size='sm' />
                                        <span>THÊM VÀO GIỎ</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="sm:flex items-center justify-between mt-6 mb-6 ml-2">
                        <h2 style={{ fontFamily: 'Lora, cursive' }} className="text-3xl font-medium font-lora text-[#546869]">Mô tả sản phẩm</h2>
                    </div>
                    <p className="text-xl opacity-70 ml-5">
                        {item.detail.describe}
                    </p>
                    <br />
                    <hr className="mt-4" />
                    <div className="px-2">
                        <div className="sm:flex items-center justify-between mt-6 mb-6">
                            <h2 style={{ fontFamily: 'Lora, cursive' }} className="text-3xl font-medium font-lora text-[#546869]">Bình luận, đánh giá</h2>
                        </div>
                        <Review id={decodedId} type={1} />
                    </div>
                    <br />
                </div>
            ) : (
                <div className="flex z-10 h-[80%]">
                    <div className=" flex flex-col justify-center items-center flex-1 h-screen bg-white font-poppins">
                        <div className="container rounded-3xl m-10 shadow-xl bg-white w-1/2 ">
                            <div className="m-10">
                                <div className="flex justify-center my-5 items-start">
                                    <img loading="lazy" src={thank} height={200} width={200} alt="" />
                                </div>
                                <div className="form flex flex-col">
                                    <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">
                                        Sản phẩm bạn tìm không tồn tại hoặc đã không còn trên hệ thống
                                    </p>
                                    <div className="flex justify-center mt-16 text-center">
                                        <Link to="/user" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                                            Quay lại
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Item