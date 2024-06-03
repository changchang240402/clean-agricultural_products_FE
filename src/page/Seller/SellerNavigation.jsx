import React, { Suspense } from "react";
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
const SellerNavigation = () => {
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
                    </Routes>
                </Suspense>
                <Footer />
            </div>
        </div>
    )
}

export default SellerNavigation