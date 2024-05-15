import React from 'react'
import HeroSection from './Home/HeroSection'
import Shop from './Shop'
import ChooseRoleForm from '../Register/ChooseRoleForm'
import TrendingProjects from './Home/TrendingProjects'
import NewProjects from './Home/NewProjects'
import NotificationList from '../Notification/NotificationList'

const Home = () => {
    return (
        <>
            <HeroSection />
            <TrendingProjects />
            <NewProjects />
            <div className="flex z-10">
                <div className=" flex flex-col justify-center items-center flex-1 bg-white font-poppins">
                    <div className="container rounded-3xl m-10 shadow-xl bg-white w-1/2 ">
                        <div className="m-10">
                            <div className="flex justify-center my-5 items-start">
                                <img loading="lazy" src={'https://png.pngtree.com/png-clipart/20240111/original/pngtree-farmer-uncle-holding-ears-of-wheat-and-harvest-fruit-elements-png-image_14074959.png'} height={200} width={200} alt="" />
                            </div>
                            <div className="form flex flex-col">
                                <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#546869] text-center text-2xl mb-12 font-semibold">
                                    Nông sản Việt Nam xin cảm ơn bạn vì đã luôn đồng hành cùng chúng tôi
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home