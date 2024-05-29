import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faTruckFast, faClipboardCheck, faCube, faBan } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { formatDateString } from '../../utility/formatdate'
import { MenuStatusOrder, MenuOrder } from '../Product/MenuProductType';
import { StatusOrder, Paginate } from '../Components'
import { Link } from "react-router-dom";
import { encodeId } from '../../utility/utils';
const ListOrder = ({ pathname }) => {
    const Data = [
        {
            id: 1,
            date: '2024-05-15 14:01:01',
            money: 1029402,
            height: 123,
            status: 2,
        },
        {
            id: 2,
            date: '2024-05-15 14:01:01',
            money: 203412,
            height: 123,
            status: 3,
        },
        {
            id: 3,
            date: '2024-05-15 14:01:01',
            money: 2930492,
            height: 123,
            status: 4,
        },
        {
            id: 4,
            date: '2024-05-15 14:01:01',
            money: 3040244,
            height: 123,
            status: 5,
        },
        {
            id: 5,
            date: '2024-05-15 14:01:01',
            money: 2938402,
            height: 123,
            status: 6,
        },
        {
            id: 6,
            date: '2024-05-15 14:01:01',
            money: 9283942,
            height: 123,
            status: 4,
        },
        {
            id: 7,
            date: '2024-05-15 14:01:01',
            money: 2930492,
            height: 123,
            status: 4,
        },
        {
            id: 8,
            date: '2024-05-15 14:01:01',
            money: 3040244,
            height: 123,
            status: 5,
        },
        {
            id: 9,
            date: '2024-05-15 14:01:01',
            money: 2938402,
            height: 123,
            status: 6,
        },
        {
            id: 10,
            date: '2024-05-15 14:01:01',
            money: 9283942,
            height: 123,
            status: 4,
        },
    ];
    return (
        <div className="m-6">
            <div className="flex flex-wrap -mx-6 w-full">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/4">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#8DD3BB]">
                        <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
                            <div className="h-8 w-8 text-white flex items-center justify-around">
                                <FontAwesomeIcon icon={faMoneyBill} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-green-700">{Number(549380002902).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                            <div className="text-gray-500">Tổng tiền</div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-6 sm:w-1/2 xl:w-1/4 mt-6 sm:mt-0">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#82D9FF]">
                        <div className="p-3 rounded-full bg-[#1F8FBF] bg-opacity-75">
                            <div className="h-8 w-8 text-white flex items-center justify-around">
                                <FontAwesomeIcon icon={faClipboardCheck} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-[#1F8FBF]">678 <FontAwesomeIcon icon={faCube} color={'#1F8FBF'} /></h4>
                            <div className="text-gray-500">Hoàn thành</div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-6 sm:w-1/2 xl:w-1/4 mt-6 xl:mt-0">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#FFAF82]">
                        <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                            <div className="h-8 w-8 text-white flex items-center justify-around">
                                <FontAwesomeIcon icon={faTruckFast} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-[#E16C2A]">678 <FontAwesomeIcon icon={faCube} color={'#E16C2A'} /></h4>
                            <div className="text-gray-500">Đang vận chuyển</div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-6 sm:w-1/2 xl:w-1/4 mt-6 xl:mt-0">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#F77676]">
                        <div className="p-3 rounded-full bg-[#CA1616] bg-opacity-75">
                            <div className="h-8 w-8 text-white flex items-center justify-around">
                                <FontAwesomeIcon icon={faBan} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-[#CA1616]">4644 <FontAwesomeIcon icon={faCube} color={'#CA1616'} /></h4>
                            <div className="text-gray-500">Bị hủy</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gap-4 sm:flex sm:items-center sm:justify-between mt-12">
                <h2
                    style={{ fontFamily: 'Lora, cursive' }}
                    className="text-xl font-semibold text-gray-900 dark:text-white sm:text-4xl">Đơn đặt hàng của bạn</h2>

                <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                    <div>
                        <label for="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
                        <select id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                            <option selected>Tất cả</option>
                            {MenuStatusOrder.map((type, key) => (
                                <option key={key} value={type.status}>{type.title}</option>
                            ))}
                        </select>
                    </div>

                    <span className="inline-block text-gray-500 dark:text-gray-400"> của </span>

                    <div>
                        <label for="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select duration</label>
                        <select id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                            <option selected>Mặc định</option>
                            {MenuOrder.map(menu => (
                                <option value={menu.id}>{menu.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            {Data.length > 0 ? (
                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700 h-[1050px] sm:h-[100%]">
                        {Data?.map((data) => (
                            <div className="flex flex-wrap items-center gap-y-6 py-6">
                                <div className="flex flex-wrap w-full lg:w-[80%]">
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Mã hóa đơn:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            <a className="hover:underline">#MDH{12040900 + data.id}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Ngày đặt hàng:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{formatDateString(data.date)}</dd>
                                    </dl>
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tổng tiền:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{Number(data.money).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</dd>
                                    </dl>
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Khối lượng:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{data.height} Kg</dd>
                                    </dl>
                                </div>
                                <div className="flex flex-wrap w-full lg:w-[20%]">
                                    <dl className="w-1/2 sm:w-1/2 lg:w-auto flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Trạng thái:</dt>
                                        <StatusOrder status={data.status} />
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-auto flex-1 lg:flex lg:items-center lg:justify-end">
                                        <Link to={{ pathname: `${pathname}${encodeId(data.id)}` }} className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                                            Xem chi tiết
                                        </Link>
                                    </dl>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row justify-end'>
                        <Paginate className='w-1/5'
                            // handlePageClick={handlePageClick}
                            pageCount={5} />
                    </div>
                </div>
            ) : (
                <div className="text-center mt-8 text-gray-500">
                    Bạn chưa có đơn hàng nào
                </div>
            )}s
        </div>
    )
}

export default ListOrder