// import { FC } from "react";
// import { Product } from "../models/Product";
// import RatingStar from "./RatingStar";
// import { addToCart } from "../redux/features/cartSlice";
// import { useAppDispatch } from "../redux/hooks";
// import toast from "react-hot-toast";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import PriceSection from "./PriceSection";
// import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from 'react';
import { StarRating } from '../ratingstar'

const ProductCard = ({
    id,
    item_name,
    product_name,
    price_type,
    price,
    quantity_sold,
    rating,
    image
}) => {

    const [showStats, setShowStats] = useState(true);

    useEffect(() => {
        if (quantity_sold === 0) {
            setShowStats(false);
        } else {
            setShowStats(true);
        }
    }, [quantity_sold]);

    const truncateItemName = (name) => {
        if (name.length > 55) {
            return name.slice(0, 55) + '...';
        }
        return name;
    };

    return (
        <div className="border border-gray-300 font-lato w-[300px] rounded-2xl" data-test="product-card">
            <div className="text-center border-b border-gray-200">
                <img src={image} alt="" className="inline-block h-60" />
            </div>
            <div className="px-4 pt-4">
                <p className="text-gray-500 text-[14px] font-medium mb-2">{product_name}</p>
                <p className="text-[16px] font-bold">{truncateItemName(item_name)}</p>
            </div>
            <div className="flex items-center justify-between px-4 pb-4">
                {showStats && (
                    <div className="">
                        <div className='flex flex-row'>
                            <StarRating
                                size={16}
                                rating={rating}
                            />
                            <span className="ml-1 text-sm opacity-70">{rating}</span>
                        </div>
                        <span className="ml-1 text-sm opacity-70">Đã bán {quantity_sold}</span>
                    </div>
                )}
                <div className="leading-3">
                    <h2 className="font-medium text-blue-500 text-xl">
                        {Number(price_type).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </h2>
                    <span className="text-sm font-semibold">
                        {Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/Kg
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
