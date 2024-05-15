import React from 'react'
import thank from '../../assets/thankyou.png'
import { Link } from "react-router-dom";
const Popup = () => {
    return (
        <div className="flex z-10">
            <div className=" flex flex-col justify-center items-center flex-1 h-screen bg-white font-poppins">
                <div className="container rounded-3xl m-10 shadow-xl bg-white w-1/2 ">
                    <div className="m-10">
                        <div className="flex justify-center my-5 items-start">
                            <img loading="lazy" src={thank} height={200} width={200} alt="" />
                        </div>
                        <div className="form flex flex-col">
                            <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">
                                Cảm ơn bạn đã đăng ký tài khoản của chúng tôi. Chúng tôi cần thời gian để xác nhận thông tin của bạn và sẽ gửi thông báo về mail cho bạn. Xin cảm ơn.
                            </p>
                            <div className="flex justify-center mt-16 text-center">
                                <Link to="/" className="bg-[#65B599] rounded-3xl px-6 py-3 font-bold text-white">
                                    Xác nhận
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup