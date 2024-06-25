import React, { Suspense, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Profile from '../../components/User/Profile'
import Navbar from '../../components/Navbar/Navbar'
import Footer from "../../components/Footer";
import OrderList from "../../components/Seller/OrderList";
import { MenuSeller } from "../../components/Product/MenuProductType";
import SideBar from "../../components/SideBar";
import OrderTrackingUser from "../../components/OrderDetail/OrderTrackingUser";
import Item from "../../components/Seller/Item";
import Product from "../../components/Seller/Product";
import Home from "../../components/Seller/Home";
import ItemDetail from "../../components/Product/ItemDetailAdminShop";
import { useNavigate } from 'react-router-dom';
import CreateItem from "../../components/Product/CreateItem";
import UpdateItem from "../../components/Product/UpdateItem";
const SellerNavigation = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('userRole');
    useEffect(() => {
        if (accessToken !== "2") {
            navigate('/');
        }
    }, [accessToken, navigate]);
    return (
        <div className="flex w-full h-screen">
            <SideBar MenuItems={MenuSeller} />
            <div className="flex bg-[#F9FAFB] flex-col flex-1">
                <Navbar />
                <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                    <Routes>
                        <Route path="profile" element={<Profile />} />
                        <Route path="order" element={<OrderList />} />
                        <Route path="tracking/:id" element={<OrderTrackingUser />} />
                        <Route path="product" element={<Product />} />
                        <Route path="item" element={<Item />} />
                        <Route path="" element={<Home />} />
                        <Route path="item/:id" element={<ItemDetail />} />
                        <Route path="createItem" element={<CreateItem />} />
                        <Route path="updateItem" element={<UpdateItem />} />
                    </Routes>
                </Suspense>
                <Footer />
            </div>
        </div>
    )
}

export default SellerNavigation