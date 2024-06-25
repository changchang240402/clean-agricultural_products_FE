import React, { useState, useEffect } from 'react';
import ProductCard from '../Product/ProductCard';
import itemService from '../../services/ItemService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot, faCartShopping, faSeedling } from '@fortawesome/free-solid-svg-icons'
import '../../index.css'
import { StarRating } from '../ratingstar'
import userService from '../../services/UserService';
import { decodeId } from '../../utility/utils';
import { useParams } from "react-router-dom";
import Mapbox from '../Logo/MapBox';
import mapBox from '../../services/MapBox';
const ShopDetail = () => {
    const { id } = useParams();
    const decodedId = decodeId(id);
    const { itemShop } = itemService();
    const { shopDetail } = userService();
    const { getLocate } = mapBox();
    const [shopData, setShopData] = useState({
        detail: {}
    });
    const [itemData, setItemData] = useState([]);
    const [locate, setLocate] = useState({
        latitude: null,
        longitude: null
    });
    const fetchData = async () => {
        try {
            const shop = await shopDetail.getShopData(decodedId)
            const data = await itemShop.getItemShopData(decodedId);
            setShopData(prevFilter => ({ ...prevFilter, detail: shop.shop }));
            setItemData(data.item)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchLocation = async (address) => {
        try {
            const data = await getLocate(address);
            setLocate({ latitude: data.latitude, longitude: data.longitude });
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [decodedId]);

    useEffect(() => {
        if (shopData.detail.address) {
            fetchLocation(shopData.detail.address);
        }
    }, [shopData.detail.address]);

    const rating = shopData.detail.average_score;
    const [showStats, setShowStats] = useState(true);
    console.log('a', locate.longitude);
    useEffect(() => {
        setShowStats(rating !== undefined && rating !== null && rating !== 0);
    }, [rating]);

    console.log('Rating:', rating, 'Type:', typeof rating);
    return (
        <>
            <div className="mx-[10px] my-[20px] p-4 font-karla w-[100%]">
                <div className="grid grid-cols-5">
                    <div className="col-span-1 ml-10px">
                        <div className='bg-white z-10 shadow-lg font-karla h-[500px] w-[95%] rounded-2xl'>
                            <div className='flex flex-col px-4 pt-4 py-2'>
                                <div className="flex flex-row">
                                    <div className="text-center border-gray-200 flex justify-end items-center">
                                        <img className='rounded-3xl' loading="lazy" src={shopData.detail.avatar} height={55} width={55} alt="" />
                                    </div>
                                    <div className="px-4 flex flex-col justify-center">
                                        <p style={{ fontFamily: 'Lora, cursive' }} className="text-gray-500 lg:text-[24px] md:text-[16px] font-bold">{shopData.detail.name}</p>
                                        {showStats && (
                                            <div className="">

                                                <div className='flex flex-row'>
                                                    <StarRating
                                                        size={21}
                                                        rating={rating}
                                                    />
                                                    <span className="ml-1 text-xl opacity-70">{rating}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='flex flex-row mt-8'>
                                    <FontAwesomeIcon icon={faSeedling} color={'#546869'} size='xl' className='h-[20px]' />
                                    <p style={{ fontFamily: 'Karla, cursive' }} className="text-gray-500 lg:text-[22px] md:text-[14px] mb-2 ml-1">{shopData.detail.total_items_in_use} sản phẩm</p>
                                </div>
                                <div className='flex flex-row mt-5'>
                                    <FontAwesomeIcon icon={faCartShopping} color={'#546869'} size='xl' className='h-[20px]' />
                                    <p style={{ fontFamily: 'Karla, cursive' }} className="text-gray-500 lg:text-[22px] md:text-[14px] mb-2 ml-1">{shopData.detail.total_sell} lượt bán</p>
                                </div>
                                <div className='flex flex-row mt-5'>
                                    <FontAwesomeIcon icon={faLocationDot} color={'#546869'} size='xl' className='h-[25px]' />
                                    <p style={{ fontFamily: 'Karla, cursive' }} className="text-gray-500 lg:text-[22px] md:text-[14px] mb-2 ml-1">{shopData.detail.address}</p>
                                </div>
                                <div className="lg:w-[100%] md:h-[14rem] xs:w-full lg:h-[13rem]">
                                    {locate.latitude && locate.longitude ? (
                                        <Mapbox
                                            width={'100%'}
                                            height={"100%"}
                                            latitude={locate.latitude}
                                            longitude={locate.longitude}
                                            zoom={14}
                                            name={shopData.detail.name}
                                        />
                                    ) : (
                                        <p>Loading map...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 space-y-4 w-[100%]">
                        <div className="flex items-center justify-between w-full">
                            <div className="bg-white font-lora h-[520px] w-[98%]">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={"https://img.pikbest.com/backgrounds/20190423/green-vegetable-background-image_1811828.jpg!bwr800"}
                                        alt=""
                                        className='h-[500px] w-[100%]'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:flex items-center justify-between">
                            <h2 style={{ fontFamily: 'Lora, cursive' }} className="text-4xl font-medium font-lora text-[#546869]">Các sản phẩm của cửa hàng</h2>
                        </div>
                        {itemData.length > 0 ? (
                            <div className='flex flex-col justify-end'>
                                <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2">
                                    {itemData?.map((product, index) => (
                                        <ProductCard
                                            key={index}
                                            product_id={product.id}
                                            item_name={product.item_name}
                                            product_name={product.product_name}
                                            price={product.price}
                                            price_type={product.price_type}
                                            rating={product.average_review_score}
                                            total_rating={product.total_reviews}
                                            quantity_sold={product.total_orders}
                                            image={product.image}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center mt-8 text-gray-500">
                                Không tìm thấy dữ liệu
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopDetail