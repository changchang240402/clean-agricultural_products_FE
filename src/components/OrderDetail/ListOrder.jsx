import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faTruckFast, faClipboardCheck, faCube, faBan, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { formatDateString } from '../../utility/formatdate'
import { MenuStatusOrder, MenuOrder } from '../Product/MenuProductType';
import { StatusOrder, Paginate } from '../Components'
import { Link } from "react-router-dom";
import { encodeId } from '../../utility/utils';
import orderDetailService from '../../services/OrderDetailService';
const ListOrder = ({ pathname }) => {
    const { orderList, statisticsOrder } = orderDetailService();
    const [filter, setFilter] = useState({
        pageCount: 0,
        currentPage: 0,
        totalOrder: 0,
        status: '',
        time: '',
    });
    const [dataOrders, setDataOrders] = useState([]);
    const [statistic, setStatistic] = useState({});
    const [isSearchClicked, setIsSearchClicked] = useState(true);
    useEffect(() => {
        if (isSearchClicked) {
            fetchData();
            setIsSearchClicked(false);
        }
    }, [filter, isSearchClicked]);

    const fetchData = async () => {
        try {
            const data = await orderList.getOrderData(filter.currentPage, filter.status, filter.time);
            const statistics = await statisticsOrder();
            setStatistic(statistics)
            if (data && data.total > 0) {
                setDataOrders(data.data)
                setFilter(prevFilter => ({ ...prevFilter, pageCount: data.total_pages, totalOrder: data.total }));
            } else {
                setDataOrders([])
                setFilter(prevFilter => ({ ...prevFilter, pageCount: 0, totalOrder: 0 }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log('a', statistic.totalMoney);
    const handlePageClick = (selectedPage) => {
        setFilter(prevFilter => ({ ...prevFilter, currentPage: selectedPage.selected }));
        setIsSearchClicked(true);
    };
    const handleStatusChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, status: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleTimeChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, time: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleClearFilter = () => {
        setFilter({
            pageCount: 0,
            currentPage: 0,
            totalOrder: 0,
            status: '',
            time: '',
        });
        setIsSearchClicked(true);
    };
    return (
        <div className="m-6">
            <div className="flex flex-wrap -mx-6 w-full">
                <div className="w-full px-3 sm:w-1/2 xl:w-1/4">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#8DD3BB]">
                        <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
                            <div className="h-8 w-8 text-gray flex items-center justify-around">
                                <FontAwesomeIcon icon={faMoneyBill} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <h4 className="text-xl font-semibold text-green-700">{Number(statistic.totalMoney).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                            <div className="text-gray-500">Tổng tiền</div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-3 sm:w-1/2 xl:w-1/4 mt-6 sm:mt-0">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#82D9FF]">
                        <div className="p-3 rounded-full bg-[#1F8FBF] bg-opacity-75">
                            <div className="h-8 w-8 text-gray flex items-center justify-around">
                                <FontAwesomeIcon icon={faClipboardCheck} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <h4 className="text-xl font-semibold text-[#1F8FBF]">{statistic.totalComplete} <FontAwesomeIcon icon={faCube} color={'#1F8FBF'} /></h4>
                            <div className="text-gray-500">Hoàn thành</div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-3 sm:w-1/2 xl:w-1/4 mt-6 xl:mt-0">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#FFAF82]">
                        <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                            <div className="h-8 w-8 text-gray flex items-center justify-around">
                                <FontAwesomeIcon icon={faTruckFast} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <h4 className="text-xl font-semibold text-[#E16C2A]">{statistic.totalTransported} <FontAwesomeIcon icon={faCube} color={'#E16C2A'} /></h4>
                            <div className="text-gray-500">Đang vận chuyển</div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-3 sm:w-1/2 xl:w-1/4 mt-6 xl:mt-0">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#F77676]">
                        <div className="p-3 rounded-full bg-[#CA1616] bg-opacity-75">
                            <div className="h-8 w-8 text-gray flex items-center justify-around">
                                <FontAwesomeIcon icon={faBan} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <h4 className="text-xl font-semibold text-[#CA1616]">{statistic.totalCancel} <FontAwesomeIcon icon={faCube} color={'#CA1616'} /></h4>
                            <div className="text-gray-500">Bị hủy</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gap-4 sm:flex sm:items-center sm:justify-between mt-12">
                <h2
                    style={{ fontFamily: 'Lora, cursive' }}
                    className="text-xl font-semibold text-gray-900 sm:text-4xl">Đơn đặt hàng của bạn</h2>

                <div className="xl:w-2/3 lg:w-1/2 mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                    <div>
                        <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select order type</label>
                        <select id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                            value={filter.status}
                            onChange={handleStatusChange}>
                            <option value=''>Tất cả</option>
                            {MenuStatusOrder.map((type, key) => (
                                <option key={key} value={type.status}>{type.title}</option>
                            ))}
                        </select>
                    </div>

                    <span className="inline-block text-gray-500"> của </span>

                    <div>
                        <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select duration</label>
                        <select id="duration" className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                            value={filter.time}
                            onChange={handleTimeChange}>
                            <option value=''>Mặc định</option>
                            {MenuOrder.map((menu, key) => (
                                <option key={key} value={menu.id}>{menu.title}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleClearFilter}>
                        <FontAwesomeIcon icon={faFilterCircleXmark} color={'#546869'} size='xl' />
                    </button>
                </div>
            </div>
            {dataOrders.length > 0 ? (
                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 h-[1050px] sm:h-[100%]">
                        {dataOrders?.map((data) => (
                            <div className="flex flex-wrap items-center gap-y-6 py-6" key={data.id}>
                                <div className="flex flex-wrap w-full lg:w-[80%]">
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500">Mã hóa đơn:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">#MDH{12040900 + data.id}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500">Ngày đặt hàng:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">{formatDateString(data.order_date)}</dd>
                                    </dl>
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500">Tổng tiền:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">{Number(data.total_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                    </dl>
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500">Khối lượng:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">{Math.floor(data.total_quantity)} Kg</dd>
                                    </dl>
                                </div>
                                <div className="flex flex-wrap w-full lg:w-[20%]">
                                    <dl className="w-1/2 sm:w-1/2 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500">Trạng thái:</dt>
                                        <StatusOrder status={data.status} />
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-auto flex-1 lg:flex lg:items-center lg:justify-end">
                                        <Link to={{ pathname: `${pathname}${encodeId(data.id)}` }} className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-white hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto">
                                            Xem chi tiết
                                        </Link>
                                    </dl>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row justify-end'>
                        <Paginate className='w-1/5' handlePageClick={handlePageClick} pageCount={filter.pageCount} />
                    </div>
                </div>
            ) : (
                <div className="text-center mt-8 text-gray-500">
                    Bạn chưa có đơn hàng nào
                </div>
            )}
        </div>
    )
}

export default ListOrder