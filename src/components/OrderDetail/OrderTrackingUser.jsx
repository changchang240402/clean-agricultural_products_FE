import React, { useState, useEffect } from 'react';
import vnpay from "../../assets/vnpay.png";
import { formatDateExpected, formatDateString, formatDateHourString } from "../../utility/formatdate"
import { StatusOrder } from '../Components'
import ReactPaginate from 'react-paginate';
import HistoryOrder from './HistoryOrder';
import MapboxDirection from '../Logo/MapDirection';
import mapBox from '../../services/MapBox';
const OrderTrackingUser = () => {
    const date = null;
    const created_at = "2024-05-23T09:36:20.000000Z";
    const delivery_date = "2024-05-23T09:36:20.000000Z";
    const received_date = null;
    const order_cancellation_date = null;
    const status = 5;
    const role = 3;
    const money = 92830293;
    const shipping = 8273900;
    const address1 = "Hải Bối, Xã Hải Bối, Huyện Đông Anh, Hà Nội";
    const address2 = "Đường Số 4, Phường Bình Hưng Hoà A, Quận Bình Tân, Tp Hồ Chí Minh"
    const truncateItemName = (name) => (name.length > 42 ? name.slice(0, 42) + '...' : name);
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
        if (showMapbox) {
            fetchLocation(address1);
        } else {
            fetchLocation(address2);
        }
    }, [showMapbox]);
    console.log("end", endPosition);
    return (
        <div className="container mt-8 mx-auto px-6 py-6">
            <div
                className="flex flex-row gap-3 sm:gap-8 py-6 border border-[#E5DCD7] border-[2px] rounded-lg mb-6">
                <div className="flex flex-col w-1/2 lg:w-1/3">
                    <div className="box group ml-2">
                        <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Đơn hàng</p>
                        <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">#MH{12040900 + 5}</h6>
                    </div>
                    <div className="box group ml-2">
                        <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Ngày giao hàng</p>
                        {date ? (
                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">{formatDateString(date)}</h6>
                        ) : (
                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">Dự kiến {formatDateExpected(created_at, 5)}</h6>
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
                        <StatusOrder status={status} />
                    </div>
                    {(status === 5 || status === 6) && (
                        <div className="box group ml-2 mt-4">
                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Lý do</p>
                            <h6 className="font-semibold font-manrope text-sl leading-9 text-[#B24101]">Không thích mua nữa</h6>
                        </div>
                    )}
                    <div className="box group ml-2 mt-5">
                        {(status === 2 || status === 3) && role === 1 && (
                            <div className="w-full inline-flex justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-900 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-red dark:focus:ring-red-700 lg:w-[150px]">
                                Hủy đơn
                            </div>
                        )}

                        {status === 2 && role === 3 && (
                            <div className="w-full inline-flex justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-900 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-red dark:focus:ring-red-700 lg:w-[150px]">
                                Từ chối
                            </div>
                        )}

                        {status === 2 && role === 2 && (
                            <div className="w-full inline-flex justify-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-blue-600 dark:bg-blue-800 dark:text-blue-400 dark:hover:bg-blue-700 dark:hover:text-blue dark:focus:ring-blue-700 lg:w-[150px]">
                                Giao hàng
                            </div>
                        )}

                        {status === 3 && role === 3 && (
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
                    {(role === 1 || role === 3) && (
                        <div className="gap-3 sm:gap-8 py-2 border border-[#E5DCD7] mb-6 w-full lg:w-1/2 lg:mr-3">
                            <div className="flex flex-col">
                                <h6 className="flex items-center justify-center font-semibold font-manrope text-xl leading-9 text-[#B24101]">THÔNG TIN NGƯỜI GỬI</h6>
                                <div className="box group ml-2">
                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Họ và tên</p>
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">Đào Thủy Trang</h6>
                                </div>
                                {role === 3 && (
                                    <div className="box group ml-2">
                                        <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Số điện thoại</p>
                                        <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">0340587329</h6>
                                    </div>
                                )}
                                <div className="box group ml-2">
                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Địa chỉ</p>
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">Trần Phú, Thị trấn Dương Đông, Thành phố Phú Quốc, Kiên Giang</h6>
                                </div>
                            </div>
                        </div>
                    )}
                    {(role === 2 || role === 3) && (
                        <div className="gap-3 sm:gap-8 py-2 border border-[#E5DCD7] mb-6 w-full lg:w-1/2 lg:mr-3">
                            <div className="flex flex-col">
                                <h6 className="flex items-center justify-center font-semibold font-manrope text-xl leading-9 text-[#B24101]">THÔNG TIN NGƯỜI NHẬN</h6>
                                <div className="box group ml-2">
                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Họ và tên</p>
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">Đào Thủy Trang</h6>
                                </div>
                                <div className="box group ml-2">
                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Số điện thoại</p>
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">0340587329</h6>
                                </div>
                                <div className="box group ml-2">
                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Địa chỉ</p>
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">Trần Phú, Thị trấn Dương Đông, Thành phố Phú Quốc, Kiên Giang</h6>
                                </div>
                            </div>
                        </div>
                    )}
                    {(role === 1 || role === 2) && (
                        <div className="gap-3 sm:gap-8 py-2 border border-[#E5DCD7] mb-6 w-full lg:w-1/2 lg:mr-3">
                            <div className="flex flex-col">
                                <h6 className="flex items-center justify-center font-semibold font-manrope text-xl leading-9 text-[#B24101]">THÔNG TIN TÀI XẾ</h6>
                                <div className="box group ml-2">
                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Họ và tên</p>
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">Đào Thủy Trang</h6>
                                </div>
                                {role === 2 && (
                                    <div>
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Số điện thoại</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">0340587329</h6>
                                        </div>
                                        <div className="box group ml-2">
                                            <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Địa chỉ</p>
                                            <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">Trần Phú, Thị trấn Dương Đông, Thành phố Phú Quốc, Kiên Giang</h6>
                                        </div>
                                    </div>
                                )}
                                <div className="box group ml-2">
                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Biển số xe</p>
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">34A123092</h6>
                                </div>
                                <div className="box group ml-2">
                                    <p className="font-normal text-base leading-7 text-gray-500 transition-all duration-500 group-hover:text-gray-700">Loại xe</p>
                                    <h6 className="font-semibold font-manrope text-xl leading-9 text-[#B24101]">ISUZU QKR230</h6>
                                </div>
                                {(status === 4 || status === 5) && (
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
                    <div className="space-y-4 p-6 flex flex-row">
                        <div className="space-y-2 w-1/5 flex justify-center">
                            <img className="w-full" src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lt5k24tjc97d95_tn.webp" alt="dress" />
                        </div>
                        <div className="flex items-start w-full flex-col space-y-4 md:space-y-0">
                            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800 mb-5">{truncateItemName(delivery_date)}</h3>
                            <div className='flex flex-row w-full'>
                                <div className="flex flex-col justify-between items-start w-1/3">
                                    <p className="text-base dark:text-white xl:text-lg leading-6 px-8">{Number(5493800).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    <p className="text-base dark:text-white xl:text-lg leading-6 px-8">20 Kg</p>
                                </div>
                                <div className="flex flex-col justify-center space-x-8 items-center w-1/3">
                                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800"> x 1</p>
                                </div>
                                <div className="flex flex-col justify-between items-end w-1/3">
                                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{Number(5493800).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">20 Kg</p>
                                </div>
                                {status === 1 && role === 1 && (
                                    <div className="box group ml-5 flex justify-center items-center w-[100px]">
                                        <div className="mr-3 w-full inline-flex justify-center rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-100 hover:text-green-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-green-600 dark:bg-green-800 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-green dark:focus:ring-green-700 lg:w-[150px]">
                                            Đánh giá
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                        <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="font-normal text-gray-500 dark:text-gray-400">Đơn hàng</dt>
                                <dd className="font-medium text-gray-900 dark:text-white">{Number(549380002902).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4">
                                <dt className="font-normal text-gray-500 dark:text-gray-400">Phí vận chuyển</dt>
                                <dd className="text-base font-medium text-green-500">+ {Number(5493800).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                            </dl>
                        </div>
                        <div>
                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                <dt className="text-lg font-bold text-gray-900 dark:text-white">Tổng tiền</dt>
                                <dd className="text-lg font-bold text-gray-900 dark:text-white">{Number(money + shipping).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4 border-gray-200 dark:border-gray-700">
                                <dt className="text-lg font-bold text-gray-900 dark:text-white">Tổng khối lượng</dt>
                                <dd className="text-lg font-bold text-gray-900 dark:text-white">3200 Kg</dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-2/5 lg:mt-0">
                    {role === 3 ? (
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
                            created_at={created_at}
                            delivery_date={delivery_date}
                            received_date={received_date}
                            order_cancellation_date={order_cancellation_date}
                            status={status}
                        />
                    )}
                </div>
            </div>
        </div >
    )
}

export default OrderTrackingUser