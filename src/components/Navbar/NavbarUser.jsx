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

const NavbarUser = () => {
    const { totalOrder } = userService();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchTotal = async () => {
            const total = await totalOrder();
            setOrder(total);
        }
        fetchTotal();
        // const socket = new WebSocket('ws://localhost:3000');

        // socket.onmessage = (event) => {
        //     const updatedOrder = JSON.parse(event.data);
        //     setOrder(updatedOrder.totalOrder);
        // };

        // socket.onopen = () => {
        //     console.log('WebSocket connection established');
        // };

        // socket.onclose = () => {
        //     console.log('WebSocket connection closed');
        // };

        // return () => {
        //     socket.close(); // Cleanup WebSocket connection on component unmount
        // };
    }, []);
    return (
        <div className="bg-white top-0 sticky z-10 shadow-lg font-karla">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start my-5 items-start">
                        <Logo size='40' className='text-4xl' />
                    </div>
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
                            <IconButton aria-label={(order)}>
                                <Badge badgeContent={order} color="error">
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
