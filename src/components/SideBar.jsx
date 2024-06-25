import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo/Logo";

function SideBar({ MenuItems }) {
    const [isShow, setIsShow] = useState(true);
    const [active, setActive] = useState(MenuItems[0].title);
    useEffect(() => {
        const handleResize = () => {
            setIsShow(window.innerWidth > 1400);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        const currentPath = location.pathname.split('/').pop();
        const currentItem = MenuItems.find(item => item.url === currentPath);
        if (currentItem) {
            setActive(currentItem.title);
        }
    }, [location.pathname, MenuItems]);
    const handleShowSidebar = () => {
        setIsShow(!isShow);
    };

    return (
        <div
            className={`flex font-poppins h-screen bg-[#fff] transition-all duration-500 text-white font-roboto border-white ${isShow ? "w-150" : "w-20"
                }`}
        >
            <div className="items flex flex-col w-full">
                <div className="flex justify-center h-20 px-2 py-2 mb-3 items-center cursor-pointer bg-[#fff]">
                    {isShow && (
                        <div className="logo h-10 mr-2 flex font-bold justify-center w-full items-center text-[#65B599] text-xl font-roboto">
                            <Logo size='40' className='text-4xl' />
                        </div>
                    )}
                    <FontAwesomeIcon
                        icon={faBars}
                        style={{ color: "#000" }}
                        size="xl"
                        onClick={handleShowSidebar}
                    />
                </div>
                <div
                    className={`text-lg w-full text-slate-400 ${isShow ? "px-2" : ""}`}
                >
                    {MenuItems.map((item, index) => {
                        return (
                            <div
                                className={`my-1 mt-4 mx-6 ${isShow ? "mx-1" : "mx-[10px]"}`}
                                key={item.title}
                            >
                                <Link to={item.url}>
                                    <div
                                        className={`flex items-center font-extrabold text-[14px] px-4 py-2 cursor-pointer
                                        text-[#737791] transition duration-200 ease-in-out rounded-xl hover:bg-[#65B599] hover:text-[white]
                                         hover:transition hover:delay-150 hover:duration-75 hover:ease-in-out 
                                         ${isShow
                                                ? "justify-between"
                                                : "justify-center px-0"
                                            }
                                         ${item.title === active
                                                ? "bg-[#65B599] rounded-xl text-white"
                                                : "bg-white text-[#737791]"
                                            }`}
                                        onClick={() => setActive(item.title)}
                                    >
                                        <div className="menu">
                                            <FontAwesomeIcon
                                                icon={item.icon}
                                                size={`${isShow ? "lg" : "lg"}`}
                                            />
                                            {isShow && <span className="pl-4 text-base">{item.title}</span>}
                                        </div>
                                        {isShow && (
                                            <div className="">
                                                <FontAwesomeIcon
                                                    icon={faChevronRight}
                                                    style={{ color: item.title === active ? "yellow" : "white" }}
                                                    size="xs"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SideBar;
