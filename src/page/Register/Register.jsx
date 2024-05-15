import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Background from "../../components/Logo/Background";
import Logo from "../../components/Logo/Logo";
import AuthService from "../../services/AuthService";
import RegistrationForm from "../../components/Register/RegistrationForm";
import ChooseRoleForm from "../../components/Register/ChooseRoleForm";
import UserRegistrationForm from "../../components/Register/UserRegistrationForm";
import TraderRegistrationForm from "../../components/Register/TraderRegistrationForm";
import SellerRegistrationForm from "../../components/Register/SellerRegistrationForm";
import { ROLE } from "../../const/config";
import React, { useState, useEffect } from 'react';
const Register = () => {
    const { regiter, showPopup, setShowPopup } = AuthService();
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        role: null,
        name: '',
        phone: '',
        address: '',
        birthday: null,
        license_plates: '',
        driving_license_number: '',
        vehicles: '',
        payload: null,
        status: null
    });
    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };
    const handleRoleSelection = (role) => {
        setUserData({ ...userData, role });
    };
    const handleRegister = () => {
        regiter(userData.email,
            userData.password,
            userData.confirm_password,
            userData.role,
            userData.name,
            userData.phone,
            userData.address,
            userData.birthday,
            userData.license_plates,
            userData.driving_license_number,
            userData.vehicles,
            userData.payload,
            userData.status);
    };
    console.log(userData);

    return (
        <div className="flex z-10">
            <div className=" flex flex-col justify-center items-center flex-1 h-screen bg-white font-poppins w-[85%]">
                <div className="container rounded-3xl m-10 shadow-xl bg-white w-2/3 ">
                    <div className="m-10">
                        <div className="flex justify-start my-5 items-start">
                            <Logo size='50' className='text-4xl' />
                        </div>
                        <div className="App">
                            {step === 1 && <RegistrationForm userData={userData} setUserData={setUserData} nextStep={nextStep} />}
                            {step === 2 && <ChooseRoleForm handleRoleSelection={handleRoleSelection} nextStep={nextStep} prevStep={prevStep} />}
                            {step === 3 && userData.role === ROLE.user && <UserRegistrationForm userData={userData} setUserData={setUserData} handleRegister={handleRegister} prevStep={prevStep} />}
                            {step === 3 && userData.role === ROLE.trader && <TraderRegistrationForm userData={userData} setUserData={setUserData} handleRegister={handleRegister} prevStep={prevStep} />}
                            {step === 3 && userData.role === ROLE.seller && <SellerRegistrationForm userData={userData} setUserData={setUserData} handleRegister={handleRegister} prevStep={prevStep} />}
                        </div>
                    </div>
                </div>
            </div>
            <Background />
        </div>
    );
}

export default Register;
