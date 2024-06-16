import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import VnPay from '../../services/VnPay';
import { formatDateExpected, formatDateString, formatDateHourString } from "../../utility/formatdate"
import AuthService from '../../services/AuthService';
import { Link } from "react-router-dom";
const VnPayReturn = () => {
    const { getUserProfile } = AuthService();
    const [user, setUser] = useState({
        detail: {}
    });
    const fetchData = async () => {
        try {
            const data = await getUserProfile();
            setUser(prevFilter => ({ ...prevFilter, detail: data }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData()
    }, []);
    const { fetchVnPayReturn, updateBill } = VnPay();
    const [result, setResult] = useState({
        detail: {}
    });
    const location = useLocation();
    const navigate = useNavigate();
    const fetchPay = async () => {
        const query = new URLSearchParams(location.search);
        if (query.has('vnp_SecureHash')) {
            try {
                const queryString = query.toString();
                const data = await fetchVnPayReturn(queryString);
                setResult(prevFilter => ({ ...prevFilter, detail: data.data }));
                // navigate({ search: '' }, { replace: true });
            } catch (error) {
                console.error('Error fetching VNPay return:', error);
            }
        }
    };
    useEffect(() => {
        fetchPay();
    }, [location.search]);
    useEffect(() => {
        if (result.detail.vnp_TransactionStatus === '00') {
            updateBill();
        }
    }, [result.detail.vnp_TransactionStatus]);
    return (
        <>
            {
                result.detail.vnp_TxnRef ? (
                    <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto mt-12 w-[100%]" >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center">
                                <Logo size='50' className='text-4xl' />
                            </div>
                            <div className="text-gray-700">
                                <div className="text-sm">Ngày: {formatDateHourString(Date())}</div>
                                <div className="text-sm">Giao dịch: #MGF{result.detail.vnp_TxnRef}</div>
                            </div>
                        </div>
                        {result.detail.vnp_TransactionStatus === '00' && (
                            <div>
                                <div className="border-b-2 border-gray-300 pb-8 mb-8">
                                    <h2 className="text-2xl font-bold mb-4">Hóa đơn:</h2>
                                    <div className="text-gray-700 mb-2">{user.detail.name}</div>
                                    <div className="text-gray-700 mb-2">{user.detail.address}</div>
                                    <div className="text-gray-700 mb-2">{user.detail.phone}</div>
                                    <div className="text-gray-700 mb-2">{user.detail.email}</div>
                                    <div className="text-gray-700 mb-2">Hình thức thanh toán: {result.detail.vnp_BankCode}</div>
                                    <div className="text-gray-700 mb-2">Nội dung: {result.detail.vnp_OrderInfo}</div>
                                </div>
                                <div className="w-full text-left mb-8 flex items-center justify-between">
                                    <span className="text-gray-700 font-bold uppercase py-2">Tổng tiền thanh toán: </span>
                                    <span className="text-gray-700 font-bold uppercase py-2">{Number(result.detail.vnp_Amount / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                                <div className="border-t-2 border-gray-300 pt-8 mb-8">
                                    <div className="text-gray-700 mb-2">Giao dịch thành công.</div>
                                    <div className="text-gray-700 mb-2"> Chúng tôi đã gửi thông báo mua hàng của bạn đến người bán. Bạn sẽ nhận được sản phẩm trong vài ngày sắp tới.</div>
                                    <div className="text-gray-700">Cảm ơn bạn đã tin dùng website của chúng tôi. Mong bạn sẽ có những trải nghiệm thật tốt. </div>
                                </div>
                                <div className="flex justify-center mt-16 text-center">
                                    <Link to="/user" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                                        Quay lại
                                    </Link>
                                </div>
                            </div>
                        )}
                        {result.detail.vnp_TransactionStatus === '01' && (
                            <div>
                                <div className="w-full text-left mb-8 flex items-center justify-between pb-8 mb-8">
                                    <span style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">Giao dịch không thành công do lỗi thông tin thẻ hoặc tài khoản không đủ số dư </span>
                                </div>
                                <div className="flex justify-center text-center">
                                    <Link to="/user/cart" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                                        Quay lại
                                    </Link>
                                </div>
                            </div>
                        )}
                        {result.detail.vnp_TransactionStatus === '02' && (
                            <div>
                                <div className="w-full text-center mb-8 flex items-center justify-between mt-16">
                                    <span style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">Giao dịch không thành công do khách hàng hủy giao dịch </span>
                                </div>
                                <div className="flex justify-center text-center">
                                    <Link to="/user/cart" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                                        Quay lại
                                    </Link>
                                </div>
                            </div>
                        )}
                        {result.detail.vnp_TransactionStatus === '24' && (
                            <div>
                                <div className="w-full text-center mb-8 flex items-center justify-between mt-16">
                                    <span style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">Giao dịch không thành công do hết thời gian chờ thanh toán. </span>
                                </div>
                                <div className="flex justify-center text-center">
                                    <Link to="/user/cart" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                                        Quay lại
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div >
                ) : (
                    <div className="flex z-10">
                        <div className=" flex flex-col justify-center items-center flex-1 h-screen bg-white font-poppins">
                            <div className="container rounded-3xl m-10 shadow-xl bg-white w-1/2 ">
                                <div className="m-10">
                                    <div className="flex justify-center my-5 items-start">
                                        <img loading="lazy" src={'https://png.pngtree.com/png-clipart/20240111/original/pngtree-farmer-uncle-holding-ears-of-wheat-and-harvest-fruit-elements-png-image_14074959.png'} height={200} width={200} alt="" />
                                    </div>
                                    <div className="form flex flex-col">
                                        <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">
                                            Hãy quay trở lại mua hàng của chúng tôi.
                                        </p>
                                        <div className="flex justify-center mt-16 text-center">
                                            <Link to="/user" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                                                Quay lại
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default VnPayReturn;