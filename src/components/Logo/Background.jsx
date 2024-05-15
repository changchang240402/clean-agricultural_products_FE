import background from "../../assets/nss.png";
import '../../index.css'
import * as React from "react";

const Background = () => {
    return (
        <div className="h-screen flex items-center bg-[#CDEAE1]">
            <img className="w-[700px] z-20" loading="lazy" src={background} alt="" />
        </div>
    )
};

export default Background