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
import Logo from "../Logo/Logo";
import '../../index.css'
import userService from '../../services/UserService';

const Navbar = () => {
    return (
        <div className="bg-white top-0 sticky z-10 shadow-lg font-karla">
            <div className="container mx-auto px-4">
                <div className="flex justify-end items-center h-[80px]">
                    <div className="flex gap-4 md:gap-8 items-center justify-end mr-[60px]">
                        <NotificationList />
                        <UserPopup />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
