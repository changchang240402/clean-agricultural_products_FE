import React, { useState, useEffect } from 'react';
import vnpay from "../../assets/vnpay.png";
import { formatDateExpected, formatDateString, formatDateHourString } from "../../utility/formatdate"
import { StatusOrder } from '../Components'
import ReactPaginate from 'react-paginate';
import HistoryOrder from './HistoryOrder';
import MapboxDirection from '../Logo/MapDirection';
import mapBox from '../../services/MapBox';
import orderDetailService from '../../services/OrderDetailService';
import { decodeId } from '../../utility/utils';
import { useParams } from "react-router-dom";
const OrderTrackingUser = () => {
    const { orderById } = orderDetailService();
    const { id } = useParams();
    const decodedId = decodeId(id);
    const [orderData, setOrderData] = useState({
        detail: {},
        role: null,
        total: 0
    });
    useEffect(() => {
        fetchData();
    }, [decodedId]);
    const fetchData = async () => {
        try {
            const data = await orderById.getOrderData(decodedId);
            setOrderData(prevFilter => ({ ...prevFilter, detail: data.order, role: data.role, total: data.total_price +data.shipping_money }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log('trang', orderData.total);
    const truncateItemName = (name) => (name.length > 50 ? name.slice(0, 50) + '...' : name);
    const [currentPosition, setCurrentPosition] = useState({ latitude: null, longitude: null });
    const [endPosition, setEndPosition] = useState({ latitude: null, longitude: null });
    const { getLocate } = mapBox();
    const [error, setError] = useState(null);
    const [showMapbox, setShowMapbox] = useState(true);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Current position:", { latitude, longitude });
                    setCurrentPosition({ latitude, longitude });
                },
                (error) => {
                    switch (error.code) {
                        case 1:
                            setError("Permission denied. Please allow location access.");
                            break;
                        case 2:
                            setError("Position unavailable.");
                            break;
                        case 3:
                            setError("Timeout while fetching location.");
                            break;
                        default:
                            setError("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);
    const fetchLocation = async (address) => {
        try {
            const data = await getLocate(address);
            setEndPosition({ latitude: data.latitude, longitude: data.longitude });
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };
    useEffect(() => {
        if (orderData.detail && showMapbox) {
            if (orderData.detail.seller) {
                fetchLocation(orderData.detail.seller.address);
            }
        } else if (orderData.detail) {
            if (orderData.detail.user) {
                fetchLocation(orderData.detail.user.address);
            }
        }
    }, [showMapbox, orderData.detail]);
    console.log("end", endPosition);
    return (
        <>
            {orderData.detail && (
                <div className="container mt-8 mx-auto px-6 py-6">
                    <div
                        className="flex flex-row gap-3 sm:gap-8 py-6 border border-[#E5DCD7] border-[2px] rounded-lg mb-6">
                        <div className="flex flex-col w-1/2 lg:w-1/3">
                            <div className="box group ml-2">
                                <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Đơn hàng</p>
                                <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">#MH{12040900 + orderData.detail.id}</h6>
                            </div>
                            <div className="box group ml-2">
                                <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Ngày giao hàng</p>
                                {orderData.detail.received_date ? (
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.received_date}</h6>
                                ) : (
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">Dự kiến {formatDateExpected(Date(), 3)}</h6>
                                )}
                            </div>
                            <div className="box group ml-2">
                                <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Phương thức thanh toán</p>
                                <div className="flex items-center justify-center bg-white w-[100px] leading-9 mb-3">
                                    <img height={70} width={70} loading="lazy" src={vnpay} alt="" />
                                </div>
                            </div>
                            <div className="box group ml-2">
                                <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Trạng thái</p>
                                <StatusOrder status={orderData.detail.status} />
                            </div>
                            {(orderData.detail.status === 5 || orderData.detail.status === 6) && (
                                <div className="box group ml-2 mt-4">
                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Lý do</p>
                                    <h6 className="font-semibold font-manrope text-sl leading-9 text-[#B24101]">{orderData.detail.cancellation_note}</h6>
                                </div>
                            )}
                            <div className="box group ml-2 mt-5">
                                {(orderData.detail.status === 2 || orderData.detail.status === 3) && orderData.role === 1 && (
                                    <div className="w-full inline-flex justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-900 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-red dark:focus:ring-red-700 lg:w-[150px]">
                                        Hủy đơn
                                    </div>
                                )}

                                {orderData.detail.status === 2 && orderData.role === 3 && (
                                    <div className="w-full inline-flex justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-900 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-red dark:focus:ring-red-700 lg:w-[150px]">
                                        Từ chối
                                    </div>
                                )}

                                {orderData.detail.status === 2 && orderData.role === 2 && (
                                    <div className="w-full inline-flex justify-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-blue-600 dark:bg-blue-800 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-blue dark:focus:ring-blue-700 lg:w-[150px]">
                                        Giao hàng
                                    </div>
                                )}

                                {orderData.detail.status === 3 && orderData.role === 3 && (
                                    <div className="flex flex-row">
                                        <div className="mr-3 w-full inline-flex justify-center rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-100 hover:text-green-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-green-600 dark:bg-green-800 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-green dark:focus:ring-green-700 lg:w-[150px]">
                                            Hoàn thành
                                        </div>
                                        <div className="w-full inline-flex justify-center rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-medium text-violet-900 hover:bg-violet-100 hover:text-violet-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-violet-600 dark:bg-violet-800 dark:text-violet-400 dark:hover:bg-violet-700 dark:hover:text-violet dark:focus:ring-violet-700 lg:w-[150px]">
                                            Trả hàng
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/2 lg:w-2/3">
                            {(orderData.role === 1 || orderData.role === 3) && (
                                <div className="gap-3 sm:gap-8 py-2 border border-[#E5DCD7] mb-6 w-full lg:w-1/2 lg:mr-3">
                                    <div className="flex flex-col">
                                        <h6 className="flex items-center justify-center font-semibold font-manrope text-xl leading-9 text-[#B24101]">THÔNG TIN NGƯỜI GỬI</h6>
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Họ và tên</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.seller.name}</h6>
                                        </div>
                                        {orderData.role === 3 && (
                                            <div className="box group ml-2">
                                                <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Số điện thoại</p>
                                                <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.seller.phone}</h6>
                                            </div>
                                        )}
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Địa chỉ</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.seller.address}</h6>
                                        </div>
                                        {(orderData.detail.status === 4 || orderData.detail.status === 5) && (
                                            <div className="box group ml-2 mt-5 flex justify-center items-end">
                                                <div className="mr-3 w-full inline-flex justify-center rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-100 hover:text-green-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-green-600 dark:bg-green-800 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-green dark:focus:ring-green-700 lg:w-[150px]">
                                                    Đánh giá
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {(orderData.role === 2 || orderData.role === 3) && (
                                <div className="gap-3 sm:gap-8 py-2 border border-[#E5DCD7] mb-6 w-full lg:w-1/2 lg:mr-3">
                                    <div className="flex flex-col">
                                        <h6 className="flex items-center justify-center font-semibold font-manrope text-xl leading-9 text-[#B24101]">THÔNG TIN NGƯỜI NHẬN</h6>
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Họ và tên</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.user.name}</h6>
                                        </div>
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Số điện thoại</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.user.phone}</h6>
                                        </div>
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Địa chỉ</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.user.address}</h6>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(orderData.role === 1 || orderData.role === 2) && (
                                <div className="gap-3 sm:gap-8 py-2 border border-[#E5DCD7] mb-6 w-full lg:w-1/2 lg:mr-3">
                                    <div className="flex flex-col">
                                        <h6 className="flex items-center justify-center font-semibold font-manrope text-xl leading-9 text-[#B24101]">THÔNG TIN TÀI XẾ</h6>
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Họ và tên</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.trader.name}</h6>
                                        </div>
                                        {orderData.role === 2 && (
                                            <div>
                                                <div className="box group ml-2">
                                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Số điện thoại</p>
                                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.trader.phone}</h6>
                                                </div>
                                                <div className="box group ml-2">
                                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Địa chỉ</p>
                                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.trader.address}</h6>
                                                </div>
                                            </div>
                                        )}
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Biển số xe</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.trader.license_plates}</h6>
                                        </div>
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Loại xe</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{orderData.detail.trader.vehicles}</h6>
                                        </div>
                                        {(orderData.detail.status === 4 || orderData.detail.status === 5) && (
                                            <div className="box group ml-2 mt-5 flex justify-center items-center">
                                                <div className="mr-3 w-full inline-flex justify-center rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-100 hover:text-green-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-green-600 dark:bg-green-800 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-green dark:focus:ring-green-700 lg:w-[150px]">
                                                    Đánh giá
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                        <div className="w-full lg:w-3/5 divide-y divide-gray-200 overflow-hidden rounded-lg border border-[#E5DCD7] border-[2px] dark:divide-gray-700 dark:border-gray-700 flex flex-col justify-between">
                            {orderData.detail.order_details?.map((data) => (
                                <div className="space-y-4 p-6 flex flex-row" key={data.id}>
                                    <div className="space-y-2 w-1/5 flex justify-center">
                                        <img className="w-full" src={data.item.image} alt="dress" />
                                    </div>
                                    <div className="flex items-start w-full flex-col space-y-4 md:space-y-0">
                                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800 mb-5">{truncateItemName(data.item.item_name)}</h3>
                                        <div className='flex flex-row w-full'>
                                            <div className="flex flex-col justify-between items-start w-1/3">
                                                <p className="text-base dark:text-white xl:text-lg leading-6 px-8">{Number(data.item.price_type).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                <p className="text-base dark:text-white xl:text-lg leading-6 px-8">{data.item.type} Kg</p>
                                            </div>
                                            <div className="flex flex-col justify-center space-x-8 items-center w-1/3">
                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800"> x {data.count}</p>
                                            </div>
                                            <div className="flex flex-col justify-between items-end w-1/3">
                                                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{Number(data.item.price_type * data.count).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{data.item.type * data.count} Kg</p>
                                            </div>
                                            {orderData.detail.status === 4 && orderData.role === 1 && (
                                                <div className="box group ml-5 flex justify-center items-center w-[100px]">
                                                    <div className="mr-3 w-full inline-flex justify-center rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-100 hover:text-green-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-green-600 dark:bg-green-800 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-green dark:focus:ring-green-700 lg:w-[150px]">
                                                        Đánh giá
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-400">Đơn hàng</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">{Number(orderData.detail.total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-400">Phí vận chuyển</dt>
                                        <dd className="text-base font-medium text-green-500">+ {Number(orderData.detail.shipping_money).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                    </dl>
                                </div>
                                <div>
                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-lg font-bold text-gray-900 dark:text-white">Tổng tiền</dt>
                                        <dd className="text-lg font-bold text-gray-900 dark:text-white">{Number(orderData.total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4 border-gray-200 dark:border-gray-700">
                                        <dt className="text-lg font-bold text-gray-900 dark:text-white">Tổng khối lượng</dt>
                                        <dd className="text-lg font-bold text-gray-900 dark:text-white">{Math.floor(orderData.detail.total_quantity)} Kg</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5 lg:mt-0">
                            {orderData.role === 3 ? (
                                <div className="">
                                    <div className='flex flex-row'>
                                        <h1
                                            style={showMapbox ? { fontFamily: 'Lora, cursive' } : null}
                                            className={`w-fit font-serif my-2 pb-1 pr-2 rounded-b-md border-b-4 text-[#546869] ${showMapbox ? 'border-[#FF8682]' : 'border-transparent'} dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-2xl md:text-xl xs:text-xl cursor-pointer mr-5`}
                                            onClick={() => setShowMapbox(true)}>
                                            Vị trí nhận hàng
                                        </h1>
                                        <h1
                                            style={!showMapbox ? { fontFamily: 'Lora, cursive' } : null}
                                            className={`w-fit font-serif my-2 pb-1 pr-2 rounded-b-md border-b-4 text-[#546869] ${!showMapbox ? 'border-[#FF8682]' : 'border-transparent'} dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-2xl md:text-xl xs:text-xl cursor-pointer`}
                                            onClick={() => setShowMapbox(false)}>
                                            Vị trí giao hàng
                                        </h1>
                                    </div>
                                    {error === "Permission denied. Please allow location access." && (
                                        <div>
                                            Please allow location access in your browser settings.
                                        </div>
                                    )}
                                    {currentPosition.latitude === null || currentPosition.longitude === null ? (
                                        <div>Loading map...</div>
                                    ) : (
                                        <div className='my-1 lg:w-[100%] md:h-[40rem] xs:w-full xs:h-[38rem]'>
                                            <MapboxDirection
                                                startLatitude={currentPosition.latitude}
                                                startLongitude={currentPosition.longitude}
                                                endLatitude={endPosition.latitude}
                                                endLongitude={endPosition.longitude}
                                                zoom={13}
                                                width="100%"
                                                height="100%"
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <HistoryOrder
                                    id={5}
                                    created_at={orderData.detail.created_at}
                                    delivery_date={orderData.detail.delivery_date}
                                    received_date={orderData.detail.received_date}
                                    order_cancellation_date={orderData.detail.order_cancellation_date}
                                    status={orderData.detail.status}
                                />
                            )}
                        </div>
                    </div>
                </div >
            )}
            {!orderData.detail && (
                <div className="text-center mt-8 text-gray-500">
                    Bạn chưa có đơn hàng nào
                </div>
            )}
        </>
    )
}

export default OrderTrackingUser