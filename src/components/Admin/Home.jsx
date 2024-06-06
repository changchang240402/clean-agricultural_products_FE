import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faTruckFast, faClipboardCheck, faCube, faBan, faFilterCircleXmark, faArrowUpShortWide, faUser, faWheatAwn } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import ApexChart from '../Chart/ApexChart';
import PieChartData from '../Chart/PieChart';
import userService from '../../services/UserService';
import Loading from '../Loading/Loading';

const Home = () => {
    const { statistics } = userService();
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await statistics();
            setData(response.statistic);
        }

        fetchData();
    }, [])
    console.log(data);
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
                            <div className="text-gray-500">Tổng tiền</div>
                            <h4 className="text-2xl font-semibold text-green-700">{Number(data?.total1?.money).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                            <div className='flex flex-row mt-2'>
                                <FontAwesomeIcon icon={faArrowUpShortWide} color={'green'} className='mr-2' />
                                <h5 className="text-sl text-green-700">{Number(data?.total1?.money_now).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-6 sm:w-1/2 xl:w-1/4 mt-6 sm:mt-0">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#82D9FF]">
                        <div className="p-3 rounded-full bg-[#1F8FBF] bg-opacity-75">
                            <div className="h-8 w-8 text-white flex items-center justify-around">
                                <FontAwesomeIcon icon={faCube} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <div className="text-gray-500">Đơn hàng</div>
                            <h4 className="text-2xl font-semibold text-[#1F8FBF]">{data?.total2?.order}<FontAwesomeIcon icon={faCube} color={'#1F8FBF'} className='ml-2' /></h4>
                            <div className='flex flex-row mt-2'>
                                <FontAwesomeIcon icon={faArrowUpShortWide} color={'green'} className='mr-2' />
                                <h5 className="text-sl text-green-700">{data?.total2?.order_now}<FontAwesomeIcon icon={faCube} color={'green'} className='ml-2' /></h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-6 sm:w-1/2 xl:w-1/4 mt-6 xl:mt-0">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#FFAF82]">
                        <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                            <div className="h-8 w-8 text-white flex items-center justify-around">
                                <FontAwesomeIcon icon={faUser} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <div className="text-gray-500">Tài khoản</div>
                            <h4 className="text-2xl font-semibold text-[#E16C2A]">{data?.total3?.user}<FontAwesomeIcon icon={faUser} color={'#E16C2A'} className='ml-2' /></h4>
                            <div className='flex flex-row mt-2'>
                                <FontAwesomeIcon icon={faArrowUpShortWide} color={'green'} className='mr-2' />
                                <h5 className="text-sl text-green-700">{data?.total3?.user_now}<FontAwesomeIcon icon={faUser} color={'green'} className='ml-2' /></h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-6 sm:w-1/2 xl:w-1/4 mt-6 xl:mt-0">
                    <div className="bg-white z-10 shadow-lg flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 border border-[#F77676]">
                        <div className="p-3 rounded-full bg-[#CA1616] bg-opacity-75">
                            <div className="h-8 w-8 text-white flex items-center justify-around">
                                <FontAwesomeIcon icon={faWheatAwn} color={'white'} size='2xl' className='h-[20px]' />
                            </div>
                        </div>
                        <div className="mx-5">
                            <div className="text-gray-500">Mặt hàng</div>
                            <h4 className="text-2xl font-semibold text-[#CA1616]">{data?.total4?.item}<FontAwesomeIcon icon={faWheatAwn} color={'#CA1616'} className='ml-2' /></h4>
                            <div className='flex flex-row mt-2'>
                                <FontAwesomeIcon icon={faArrowUpShortWide} color={'green'} className='mr-2' />
                                <h5 className="text-sl text-green-700">{data?.total4?.item_now}<FontAwesomeIcon icon={faWheatAwn} color={'green'} className='ml-2' /></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gap-4 sm:flex sm:items-center sm:justify-between mt-12">
                {(data?.order_month) ? (
                    <div className='flex flex-1 flex-col bg-white w-2/3 m-2'>
                        <label className='text-base font-bold'>Bảng thống kê doanh thu 12 tháng</label>
                        <div className="flex justify-center items-center">
                            <ApexChart orderMonthData={data?.order_month} />
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
                        <label className='text-base font-bold'>Bảng thống kê 12 tháng</label>
                        <Loading />
                    </div >
                )}
                {(data?.order_status) ? (
                    <div className='flex flex-1 flex-col bg-white w-1/3 m-2'>
                        <label className='text-base font-bold'>Thống kê các đơn hàng</label>
                        <div className="flex justify-center items-center">
                            <PieChartData orderStatusData={data?.order_status} />
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
                        <label className='text-base font-bold'>Thống kê các đơn hàng</label>
                        <Loading />
                    </div >
                )}

            </div>
        </div>
    )
}

export default Home