import React, { Suspense, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Profile from '../../components/User/Profile'
import NavbarAdmin from '../../components/Navbar/NavbarAdmin'
import Footer from "../../components/Footer";
import { MenuAdmin } from "../../components/Product/MenuProductType";
import SideBar from "../../components/SideBar";
import Home from "../../components/Admin/Home";
import User from "../../components/Admin/User";
import Seller from "../../components/Admin/Seller";
import Trader from "../../components/Admin/Trader";
import Item from "../../components/Admin/Item";
import Product from "../../components/Admin/Product";
import ItemDetail from "../../components/Product/ItemDetailAdminShop";
import { useNavigate } from 'react-router-dom';
const AdminNavigation = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('userRole');
    useEffect(() => {
        if (accessToken !== "0") {
            navigate('/');
        }
    }, [accessToken, navigate]);
    return (
        <div className="flex w-full h-screen">
            <SideBar MenuItems={MenuAdmin} />
            <div className="flex bg-[#F9FAFB] flex-col flex-1">
                <NavbarAdmin />
                <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                    <Routes>
                        <Route path="profile" element={<Profile />} />
                        <Route path="" element={<Home />} />
                        <Route path="users" element={<User />} />
                        <Route path="seller" element={<Seller />} />
                        <Route path="trader" element={<Trader />} />
                        <Route path="product" element={<Product />} />
                        <Route path="item" element={<Item />} />
                        <Route path="item/:id" element={<ItemDetail />} />
                    </Routes>
                </Suspense>
                <Footer />
            </div>
        </div>
    )
}

export default AdminNavigation