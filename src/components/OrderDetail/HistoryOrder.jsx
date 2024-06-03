import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faHourglassHalf, faCheck, faXmark, faRotateLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
import { formatDateExpected, formatDateString, formatDateHourString } from "../../utility/formatdate"
const HistoryOrder = ({
    id,
    created_at,
    delivery_date,
    received_date,
    order_cancellation_date,
    status,
}) => {
    return (
        <div className="space-y-6 rounded-lg border border-[#E5DCD7] border-[2px] bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Lịch sử đơn hàng</h3>

            <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                {received_date ? (
                    status === 4 ? (
                        <li className="mb-10 ms-6 text-green-700 dark:text-green-500">
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white dark:bg-green-900 dark:ring-gray-800">
                                <FontAwesomeIcon icon={faCheck} color={'green'} className='w-[15px]' />
                            </span>
                            <h4 className="mb-0.5 font-semibold">{received_date}</h4>
                            <a className="text-sm font-medium hover:underline">Giao hàng thành công</a>
                        </li>
                    ) : (
                        <li className="mb-10 ms-6 text-violet-700 dark:text-violet-500">
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 ring-8 ring-white dark:bg-violet-900 dark:ring-gray-800">
                                <FontAwesomeIcon icon={faRotateLeft} color={'#5907C0'} className='w-[15px]' />
                            </span>
                            <h4 className="mb-0.5 font-semibold">{received_date}</h4>
                            <a className="text-sm font-medium hover:underline">Hoàn trả lại đơn hàng</a>
                        </li>
                    )
                ) : (
                    order_cancellation_date ? (
                        <li className="mb-10 ms-6 text-red-800 dark:text-red-500">
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-100 ring-8 ring-white dark:bg-red-900 dark:ring-gray-800">
                                <FontAwesomeIcon icon={faXmark} color={'#CA1616'} className='w-[15px]' />
                            </span>
                            <h4 className="mb-0.5 font-semibold">Đã hủy vào {order_cancellation_date}</h4>
                            <a className="text-sm font-medium hover:underline">Giao hàng</a>
                        </li>
                    ) : (
                        <li className="mb-10 ms-6">
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-900 dark:ring-gray-800">
                                <FontAwesomeIcon icon={faHouse} color={'gray'} className='w-[15px]' />
                            </span>
                            <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Dự kiến {formatDateExpected(Date(), 3)}</h4>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Giao hàng</p>
                        </li>
                    )
                )
                }

                {received_date ? (
                    <li className="mb-10 ms-6 text-green-700 dark:text-green-500">
                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white dark:bg-green-900 dark:ring-gray-800">
                            <FontAwesomeIcon icon={faCheck} color={'green'} className='w-[15px]' />
                        </span>
                        <h4 className="mb-0.5 font-semibold">{received_date}</h4>
                        <a className="text-sm font-medium hover:underline">Đã vận chuyển đến nơi</a>
                    </li>
                ) : (
                    order_cancellation_date ? (
                        <li className="mb-10 ms-6 text-red-800 dark:text-red-500">
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-100 ring-8 ring-white dark:bg-red-900 dark:ring-gray-800">
                                <FontAwesomeIcon icon={faXmark} color={'#CA1616'} className='w-[15px]' />
                            </span>
                            <h4 className="mb-0.5 font-semibold">Đã hủy vào {order_cancellation_date}</h4>
                            <a className="text-sm font-medium hover:underline">Vận chuyển</a>
                        </li>
                    ) : (
                        delivery_date ? (
                            <li className="mb-10 ms-6 text-yellow-800 dark:text-yellow-500">
                                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 ring-8 ring-white dark:bg-yellow-900 dark:ring-gray-800">
                                    <FontAwesomeIcon icon={faTruckFast} color={'#D0A63B'} className='w-[15px]' />
                                </span>
                                <h4 className="mb-0.5 font-semibold">Dự kiến {formatDateExpected(Date(), 3)}</h4>
                                <a className="text-sm font-medium hover:underline">Đang vận chuyển</a>
                            </li>
                        ) : (
                            <li className="mb-10 ms-6">
                                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-900 dark:ring-gray-800">
                                    <FontAwesomeIcon icon={faTruckFast} color={'gray'} className='w-[15px]' />
                                </span>
                                <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Dự kiến {formatDateExpected(Date(), 3)}</h4>
                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Vận chuyển</p>
                            </li>
                        )
                    )
                )
                }
                {delivery_date ? (
                    <li className="mb-10 ms-6 text-green-700 dark:text-green-500">
                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white dark:bg-green-900 dark:ring-gray-800">
                            <FontAwesomeIcon icon={faCheck} color={'green'} className='w-[15px]' />
                        </span>
                        <h4 className="mb-0.5 font-semibold">{delivery_date}</h4>
                        <a className="text-sm font-medium hover:underline">Đơn hàng đã xuất kho</a>
                    </li>
                ) : (
                    order_cancellation_date ? (
                        <li className="mb-10 ms-6 text-red-800 dark:text-red-500">
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-100 ring-8 ring-white dark:bg-red-900 dark:ring-gray-800">
                                <FontAwesomeIcon icon={faXmark} color={'#CA1616'} className='w-[15px]' />
                            </span>
                            <h4 className="mb-0.5 font-semibold">Đã hủy vào {order_cancellation_date}</h4>
                            <a className="text-sm font-medium hover:underline">Chuẩn bị đơn hàng</a>
                        </li>
                    ) : (
                        <li className="mb-10 ms-6 text-[#3F68D2] dark:text-[#3F68D2]">
                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-800">
                                <FontAwesomeIcon icon={faHourglassHalf} color={'#3F68D2'} className='w-[15px]' />
                            </span>
                            <h4 className="mb-0.5 font-semibold">Dự kiến {formatDateExpected(Date(), 2)}</h4>
                            <a className="text-sm font-medium hover:underline">Chuẩn bị đơn hàng</a>
                        </li>
                    )
                )
                }
                <li className="mb-10 ms-6 text-green-700 dark:text-green-500">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white dark:bg-green-900 dark:ring-gray-800">
                        <FontAwesomeIcon icon={faCheck} color={'green'} className='w-[15px]' />
                    </span>
                    <h4 className="mb-0.5 font-semibold">{created_at}</h4>
                    <a className="text-sm font-medium hover:underline">Thanh tóan thành công - VnPay</a>
                </li>

                <li className="ms-6 text-green-700 dark:text-green-500">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 ring-8 ring-white dark:bg-green-900 dark:ring-gray-800">
                        <FontAwesomeIcon icon={faCheck} color={'green'} className='w-[15px]' />
                    </span>
                    <h4 className="mb-0.5 font-semibold">{created_at}</h4>
                    <a className="text-sm font-medium hover:underline">Tạo đơn #MDH{12040900 + id}</a>
                </li>
            </ol>
        </div>
    )
}

export default HistoryOrder