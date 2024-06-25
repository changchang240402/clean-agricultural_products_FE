import React, { useState, useRef, useEffect } from 'react'
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import icon from '../../assets/user.png'
const UserPopup = () => {
    const { getUserProfile, logout } = AuthService();
    const [isVisible, setVisible] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await getUserProfile();
            setUser(userProfile);
        }
        fetchUserProfile();
    }, []);
    const handlePopup = () => {
        setVisible((v) => !v);
    };

    const handleLogout = () => {
        logout();
        hidePopup();
    };

    const hidePopup = () => {
        setVisible(false);
    };

    return (
        <div style={{ cursor: 'pointer' }} className="relative font-karla">

            <div
                className="text-xl font-bold text-[#546869] flex flex-row items-center"
                onClick={handlePopup}
                data-test="username-popup"
                style={{ fontFamily: 'Lobster, cursive' }}
            >
                <img className='rounded-3xl mr-3' loading="lazy" src={user.avatar ? user.avatar : icon} height={40} width={40} alt="" />
                {user.name}
            </div>
            {isVisible && (
                <div
                    className="absolute p-4 w-[210px] z-50 mt-2 rounded-md shadow-2xl bg-white ring-1 transition-all ring-black ring-opacity-5 focus:outline-none"
                    data-test="popup-content-list"
                >
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <FontAwesomeIcon icon={faAddressCard} color='#546869' />
                                </td>
                                <td style={{ fontFamily: 'Karla, cursive' }} className="hover:underline cursor-pointer text-lg pl-2 text-[#546869]">
                                    <Link to={"profile"} onClick={hidePopup}>
                                        Thông tin cá nhân
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FontAwesomeIcon icon={faRightFromBracket} color='#546869' />
                                </td>
                                <td style={{ fontFamily: 'Karla, cursive' }}
                                    className="hover:underline cursor-pointer text-lg pl-2 text-[#546869]"
                                    onClick={handleLogout}
                                    data-test="logout-btn"
                                >
                                    Đăng xuất
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserPopup;