import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faTruckFast, faClipboardCheck, faCube, faBan, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

const Home = () => {
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
                            <h4 className="text-2xl font-semibold text-green-700">{Number(10000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
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
                            <h4 className="text-2xl font-semibold text-[#1F8FBF]">100 <FontAwesomeIcon icon={faCube} color={'#1F8FBF'} /></h4>
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
                            <h4 className="text-2xl font-semibold text-[#E16C2A]">100 <FontAwesomeIcon icon={faCube} color={'#E16C2A'} /></h4>
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
                            <h4 className="text-2xl font-semibold text-[#CA1616]">100 <FontAwesomeIcon icon={faCube} color={'#CA1616'} /></h4>
                            <div className="text-gray-500">Bị hủy</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gap-4 sm:flex sm:items-center sm:justify-between mt-12">
            </div>
        </div>
    )
}

export default Home