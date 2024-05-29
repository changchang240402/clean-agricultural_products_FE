import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import NavbarUser from '../../components/Navbar/NavbarUser'
import Home from '../../components/User/Home'
import Product from '../../components/User/Product'
import Shop from '../../components/User/Shop'
import Profile from "../../components/User/Profile";
import Cart from "../../components/User/Cart";
import Footer from "../../components/Footer";
import Item from "../../components/Product/ItemDetail";
import ShopDetail from "../../components/User/ShopDetail";
import OrderTrackingUser from "../../components/OrderDetail/OrderTrackingUser";
import VnPayReturn from "../../components/VnPay/VnPayReturn";
import PaymentComponent from "../../components/VnPay/PaymentComponent";
import CheckoutForm from "../../components/User/Stripe/Stripe";
const UserNavigation = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex bg-white flex-col flex-1">
                <NavbarUser />
                <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="product" element={<Product />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="item/:id" element={<Item />} />
                        <Route path="shop/:id" element={<ShopDetail />} />
                        <Route path="tracking/:id" element={<OrderTrackingUser />} />
                        <Route path="/vnpay_return" element={<VnPayReturn />} />
                        <Route path="/payment" element={<PaymentComponent />} />
                        <Route path="/pay" element={<CheckoutForm />} />
                    </Routes>
                </Suspense>
                <Footer />
            </div>
        </div>
    )
}

export default UserNavigation