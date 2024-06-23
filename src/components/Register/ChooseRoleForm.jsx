import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import { faArrowRight, faArrowLeft, faShop, faBasketShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { ROLE } from "../../const/config";

const ChooseRoleForm = ({ handleRoleSelection, nextStep, prevStep }) => {
    const [selectedRole, setSelectedRole] = useState(null);
    const { handleSubmit } = useForm();

    const handleFormSubmit = () => {
        if (selectedRole !== null) {
            handleRoleSelection(selectedRole);
            nextStep();
        }
    };

    const handleRoleChange = (role) => {
        setSelectedRole(role);
    };

    const handleBack = () => {
        prevStep();
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(handleFormSubmit)}>
            <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-4xl mt-10 mb-12 font-semibold">
                Bạn là:
            </p>
            <div className="flex flex-col">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        name="role"
                        className="form-radio text-[#74BBA5] h-5 w-5 mr-3"
                        checked={selectedRole === ROLE.user}
                        onChange={() => handleRoleChange(ROLE.user)}
                    />
                    <span style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-3xl">Người mua hàng</span>
                    <FontAwesomeIcon icon={faBasketShopping} className="ml-3" size="xl" color="#546869" />
                </label>
                <label className="inline-flex items-center mt-5">
                    <input
                        type="radio"
                        name="role"
                        className="form-radio text-[#74BBA5] h-5 w-5 mr-3"
                        checked={selectedRole === ROLE.seller}
                        onChange={() => handleRoleChange(ROLE.seller)}
                    />
                    <span style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-3xl">Người bán hàng</span>
                    <FontAwesomeIcon icon={faShop} className="ml-3" size="xl" color="#546869" />
                </label>
                <label className="inline-flex items-center mt-5">
                    <input
                        type="radio"
                        name="role"
                        className="form-radio text-[#74BBA5] h-5 w-5 mr-3"
                        checked={selectedRole === ROLE.trader}
                        onChange={() => handleRoleChange(ROLE.trader)}
                    />
                    <span style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-3xl">Người vận chuyển</span>
                    <FontAwesomeIcon icon={faTruckFast} className="ml-3" size="xl" color="#546869" />
                </label>
            </div>
            <div className="flex justify-between mt-10 text-center">
                <button className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white" onClick={handleBack}>
                    Quay lại
                    <FontAwesomeIcon icon={faArrowLeft} className="ml-3" />
                </button>
                <button type="submit" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                    Tiếp theo
                    <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
                </button>
            </div>
        </form>
    );
}

export default ChooseRoleForm;