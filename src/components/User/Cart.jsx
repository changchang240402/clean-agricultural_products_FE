import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faShop, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import OrderDetailCart from '../OrderDetail/OrderDetailCart';
import orderDetailService from '../../services/OrderDetailService';
import VnPay from '../../services/VnPay';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Toastify } from "../../toastify/Toastify";
const Cart = () => {
    const { getOrderByUser, deleteOrderByUser } = orderDetailService();
    const [orders, setOrders] = useState([]);
    const { payment } = VnPay();

    const fetchData = async () => {
        try {
            const data = await getOrderByUser();
            setOrders(data.order);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const totalAmount = orders.reduce((acc, order) => {
        const price = parseFloat(order.total_price);
        const shipping = parseFloat(order.shipping_money);
        return acc + (price + shipping);
    }, 0);
    const orderIds = orders.reduce((acc, order) => {
        return acc + order.id;
    }, 0);
    const orderId = orders.map(order => order.id);
    console.log('cb', orderId);
    const handlePayment = async () => {
        try {
            await payment(orderIds, totalAmount);
            // const query = new URLSearchParams(location.search);
            // if (query.has('vnp_SecureHash')) {
            //     const queryString = query.toString();
            //     const data = await fetchVnPayReturn(queryString);
            //     setResult(prevFilter => ({ ...prevFilter, detail: data.data }));
            //     history.replace({ search: '' });
            // }
        } catch (error) {
            console.error('Error during payment or fetching VNPay return:', error);
        }
    };
    const handleUpdate = (id, newQty) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => {
                const updatedOrderDetails = order.order_details.map((detail) =>
                    detail.id === id ? { ...detail, count: newQty } : detail
                );
                const updatedTotalPrice = updatedOrderDetails.reduce((acc, detail) => acc + detail.item.price_type * detail.count, 0);
                const updatedShipping = updatedOrderDetails.reduce((acc, detail) => acc + detail.item.type * detail.count, 0) * order.cost;
                return {
                    ...order,
                    order_details: updatedOrderDetails,
                    total_price: updatedTotalPrice,
                    shipping_money: updatedShipping,
                };
            })
        );
    };

    const handleDelete = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => ({
                ...order,
                order_details: order.order_details.filter((detail) => detail.id !== id),
                total_price: order.order_details.reduce((acc, detail) => acc + detail.item.price_type * detail.count, 0),
                shipping_money: order.order_details.reduce((acc, detail) => acc + detail.item.type * detail.count, 0) * order.cost
            }))
        );
    };

    const deleteOrder = async (orderId) => {
        try {
            await deleteOrderByUser.getOrderData(orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };
    return (
        <>
            <div className="container mx-auto px-4 mx-[10px] my-[20px] p-4 font-karla w-[100%]">
                <div className="sm:flex items-center justify-between mb-8">
                    <h2 style={{ fontFamily: 'Lora, cursive' }} className="text-4xl font-medium font-lora text-[#546869]">Giỏ hàng của bạn </h2>
                </div>
                {orders.length > 0 ? (
                    <div className="flex flex-row justify-between">
                        <div className='flex flex-col justify-between w-2/3'>
                            <div className="flex flex-col">
                                {orders?.map((order, index) => (
                                    <div className='flex flex-col border-2 border-gray-300 mb-5 rounded-sm items-center px-2 pt-2 py-2 w-[80%]' key={index}>
                                        <div className='flex flex-row justify-between w-[100%]'>
                                            <div className='flex flex-row'>
                                                <FontAwesomeIcon icon={faShop} color={'#546869'} size='xl' className='h-[20px]' />
                                                <p style={{ fontFamily: 'Lora, cursive' }} className="text-gray-500 text-[22px] mb-2 ml-2">{order.seller.name}</p>
                                            </div>
                                            <button type="button" className="text-gray-600 hover:text-blue-800 mb-3" onClick={() => deleteOrder(order.id)}>
                                                <FontAwesomeIcon icon={faTrashCan} color={'red'} size='xl' className='h-[20px]' />
                                            </button>
                                            {/* <div>
                                                <FontAwesomeIcon icon={faTrashCan} color={'red'} size='xl' className='h-[20px]' />
                                            </div> */}
                                        </div>
                                        <div className="flex flex-col w-[100%]">
                                            {order.order_details.map((order_detail, index) => (
                                                <OrderDetailCart
                                                    key={index}
                                                    id={order_detail.id}
                                                    images={order_detail.item.image}
                                                    title={order_detail.item.item_name}
                                                    quantity={order_detail.count}
                                                    price={order_detail.item.price_type}
                                                    type={order_detail.item.type}
                                                    onUpdate={handleUpdate}
                                                    onDelete={handleDelete}
                                                    count={order_detail.item.total}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='h-[60%] w-1/3'>
                            <div className="bg-white shadow-lg flex flex-col w-[100%] h-1/3">
                                <div className="text-light-blue p-4 min-h-[420px] flex flex-col">
                                    <div className="flex border-b border-gray-200 pb-3 mb-4 items-center justify-center">
                                        <h6 style={{ fontFamily: 'Lora, cursive' }} className="text-xl font-semibold text-[#546869] text-[26px]">Tổng hóa đơn</h6>
                                    </div>
                                    <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                                        {orders.map((order, index) => (
                                            <div className="space-y-2" key={index}>
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="font-normal text-gray-500 dark:text-gray-400">Hóa đơn #MH{order.id}</dt>
                                                    <dd className="font-medium text-gray-900 dark:text-white">{Number(order.total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                                </dl>
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="font-normal text-gray-500 dark:text-gray-400">Phí vận chuyển</dt>
                                                    <dd className="text-base font-medium text-green-500">+{Number(order.shipping_money).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                                </dl>
                                            </div>
                                        ))}
                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                            <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                                            <dd className="text-lg font-bold text-gray-900 dark:text-white">{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                        </dl>
                                    </div>
                                    <div
                                        //  className="text-xl font-bold text-[#546869]"
                                        //  data-test="main-products"
                                        style={{ fontFamily: 'Lobster, cursive' }}
                                    >
                                        <button onClick={handlePayment} type="button" className="w-full bg-[#EE3731] text-white py-2 rounded-md">Thanh toán</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-8 text-gray-500">
                        Bạn chưa có đơn nào trong giỏ hàng
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
