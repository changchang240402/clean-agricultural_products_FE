import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faMoneyBill1Wave, faWarehouse, faCheck, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import orderDetailService from '../../services/OrderDetailService';

const OrderDetailCart = ({
    id,
    images,
    title,
    quantity,
    price,
    type,
    onUpdate,
    onDelete,
    count
}) => {
    const [qty, setQty] = useState(quantity);
    const [total, setTotal] = useState(quantity * price);
    const [weight, setWeight] = useState(quantity * type);
    const { editOrderDetailByUser, deleteOrderDetailByUser } = orderDetailService();

    useEffect(() => {
        setTotal(qty * price);
        setWeight(qty * type);
    }, [qty, price, type]);

    const n = Math.floor(count / type);
    const increaseQty = () => {
        setQty((prevQty) => (prevQty < n ? prevQty + 1 : n));
    };

    const decreaseQty = () => {
        setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
    };

    const truncateItemName = (name) => (name.length > 42 ? name.slice(0, 42) + '...' : name);

    const [isEditing, setIsEditing] = useState(false);

    const edit = () => {
        setIsEditing(true);
    };

    const closeEdit = async () => {
        await editOrderDetailByUser.getOrderDetailData(id, qty);
        onUpdate(id, qty);
        setIsEditing(false);
    };

    const deleteOrder = async () => {
        await deleteOrderDetailByUser.getOrderDetailData(id);
        onDelete(id);
    };

    return (
        <div className='flex flex-col border-t border-gray-200 w-[100%] mt-5' key={id}>
            <div className="flex flex-row px-4 font-karla mt-2 mb-1">
                <div className="space-y-2 w-1/5 flex justify-center">
                    <img src={images} alt="selected" height={120} width={120} />
                </div>
                <div className="px-2 w-4/5">
                    <h2 style={{ fontFamily: 'Lora, cursive' }} className="text-2xl text-[#546869]">{truncateItemName(title)}</h2>
                    <div className="flex my-2 justify-between items-end">
                        <div className="flex items-center">
                            <span className="font-semibold text-[#546869] text-xl mb-1">Số lượng:</span>
                        </div>
                        {!isEditing ? (
                            <div className='flex flex-row w-4/5 justify-between'>
                                <div className="flex rounded-md border border-gray-300 h-[35px] items-center mb-[1px] px-3">
                                    <span style={{ fontFamily: 'Lora, cursive' }} className="text-center text-xl text-[#112211]">{qty}</span>
                                </div>
                                <div className='flex flex-row justify-end items-end w-1/4'>
                                    <button type="button" className="text-gray-600 hover:text-blue-800 w-1/4 mb-3" onClick={edit}>
                                        <FontAwesomeIcon icon={faPenToSquare} color={'green'} size='xl' className='h-[20px]' />
                                    </button>
                                    <button type="button" className="text-gray-600 hover:text-blue-800 w-1/4 mb-3" onClick={deleteOrder}>
                                        <FontAwesomeIcon icon={faTrashCan} color={'red'} size='xl' className='h-[20px]' />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-row w-3/4 justify-between items-end'>
                                <div className="flex border border-gray-300 w-1/2 rounded-md h-[35px] items-center justify-between px-3">
                                    <button type="button" className="text-gray-600 hover:text-gray-800 w-1/4" onClick={decreaseQty}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <span className="text-center text-xl w-1/2">{qty}</span>
                                    <button type="button" className="text-gray-600 hover:text-blue-800 w-1/4" onClick={increaseQty}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                <div className='flex flex-row justify-end items-end w-1/2 mb-2'>
                                    <button type="button" className="bg-[#4BA4F6] px-1 py-1 font-bold text-white" onClick={closeEdit}>
                                        <FontAwesomeIcon icon={faCheck} color={'white'} size='xl' className='h-[20px]' />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row">
                        <div style={{ fontFamily: 'Karla, cursive' }} className="flex flex-col justify-between w-1/2">
                            <div className='text-[#546869] font-[400] text-[18px] mb-1'>Khối lượng : {type} Kg</div>
                            <div className='text-[#546869] font-[400] text-[18px]'>Giá bán: {Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        </div>
                        <div className="flex flex-col justify-between items-end w-1/2">
                            <div className='font-[600] text-[20px] text-[#112211] mb-1'>
                                <FontAwesomeIcon icon={faWarehouse} className="opacity-70 mr-2" size='sm' />
                                <span style={{ fontFamily: 'Lora, cursive' }}>{weight} kg</span>
                            </div>
                            <div className='font-[600] text-[20px] text-[#112211]'>
                                <FontAwesomeIcon icon={faMoneyBill1Wave} className="opacity-70 mr-2" size='sm' />
                                <span style={{ fontFamily: 'Lora, cursive' }}>{Number(total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailCart;
