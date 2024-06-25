import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { decodeId } from '../../utility/utils';
import { Link } from "react-router-dom";
import { StarRating } from '../ratingstar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse, faCartShopping, faPlus, faSeedling, faTags, faMoneyBill1Wave, faMinus } from '@fortawesome/free-solid-svg-icons'
import Review from '../Review/Review';
import itemService from '../../services/ItemService';
import orderDetailService from '../../services/OrderDetailService';
const ItemDetail = () => {
    const { id } = useParams();
    const decodedId = decodeId(id);
    const { itemDetail } = itemService();
    const [item, setItem] = useState({
        detail: {}
    });

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
    return (
        <>
            <div className="pt-8">
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
        </>
    )
}

export default ItemDetail