import agri from "../../assets/agri.png"
import '../../index.css'
import * as React from "react";

const Logo = React.forwardRef(function Logo(props, ref) {
    const { size } = props;
    return (
        <div className="logo h-10 mr-2 flex font-bold justify-center w-full items-center text-[#72E9C0] text-xl font-roboto">
            <h1 style={{ fontFamily: 'Lobster, cursive' }} className="text-5xl">
                N
            </h1>
            <div className="">
                <img loading="lazy" src={agri} height={size} width={size} alt="" />
            </div>
            <h1 style={{ fontFamily: 'Lobster, cursive' }} className="text-5xl">
                ng Sản Việt
            </h1>
        </div>
    )
});

export default Logo