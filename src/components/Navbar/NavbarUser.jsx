import { useState, useRef, useEffect } from 'react';
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { BsSearch } from "react-icons/bs";
// import { useAppSelector, useAppDispatch } from "../redux/hooks";
// import { setCartState } from "../redux/features/cartSlice";
// import { updateModal } from "../redux/features/authSlice";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSeedling, faShop, faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import UserPopup from './UserPopup';
import NotificationList from '../Notification/NotificationList';
// import useAuth from "../hooks/useAuth";
// import { FaUser } from "react-icons/fa";
// import CustomPopup from "./CustomPopup";
import Logo from "../Logo/Logo";
import '../../index.css'

const NavbarUser = () => {
    // const dispatch = useAppDispatch();
    // const cartCount = useAppSelector(
    //     (state) => state.cartReducer.cartItems.length
    // );
    const cartCount = 100;
    // const username = useAppSelector((state) => state.authReducer.username);
    // const { requireAuth } = useAuth();

    // const showCart = () => {
    //     requireAuth(() => dispatch(setCartState(true)));
    // };

    return (
        <div className="bg-white top-0 sticky z-10 shadow-lg font-karla">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start my-5 items-start">
                        <Logo size='40' className='text-4xl' />
                    </div>
                    {/* <div className="lg:flex hidden w-full max-w-[500px]">
                        <input
                            type="text"
                            placeholder="Search for a product..."
                            className="border-2 border-blue-500 px-6 py-2 w-full"
                        />
                        <div className="bg-blue-500 text-white text-[26px] grid place-items-center px-4">
                            <BsSearch />
                        </div>
                    </div> */}
                    <div className="flex gap-4 md:gap-8 items-center">
                        <Link
                            to="/user/"
                            className="text-xl font-bold text-[#546869]"
                            data-test="main-products"
                            style={{ fontFamily: 'Lobster, cursive' }}
                        >
                            <FontAwesomeIcon icon={faHome} className="mr-1 mt-1" color="#546869" />
                            Trang chủ
                        </Link>
                        <Link
                            to="/user/product"
                            className="text-xl font-bold text-[#546869]"
                            data-test="main-products"
                            style={{ fontFamily: 'Lobster, cursive' }}
                        >
                            <FontAwesomeIcon icon={faSeedling} className="mr-1 mt-1" color="#546869" />
                            Sản phẩm
                        </Link>
                        <Link
                            to="/user/shop"
                            className="text-xl font-bold text-[#546869]"
                            data-test="main-products"
                            style={{ fontFamily: 'Lobster, cursive' }}
                        >
                            <FontAwesomeIcon icon={faShop} className="mr-1 mt-1" color="#546869" />
                            Cửa hàng
                        </Link>
                        <Link
                            to="/user/cart"
                            className="text-gray-500 text-xl relative hover:cursor-pointer hover:opacity-80"
                            data-test="main-products"
                            style={{ fontFamily: 'Lobster, cursive' }}
                        >
                            <IconButton aria-label={(cartCount)}>
                                <Badge badgeContent={cartCount} color="error">
                                    <FontAwesomeIcon icon={faBasketShopping} className="mr-1 mt-1" color="#546869" />
                                </Badge>
                            </IconButton>
                        </Link>
                        <NotificationList />
                        <UserPopup />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarUser;
