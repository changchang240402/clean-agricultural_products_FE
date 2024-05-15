import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react'
import { Virtuoso } from 'react-virtuoso'
const NotificationList = () => {
    const [isVisible, setVisible] = useState(false);
    const handlePopup = () => {
        setVisible((v) => !v);
    };
    const hidePopup = () => {
        setVisible(false);
    };
    const notifications = [
        { id: 1, content: 'Notification content 1', time: '10:00 AM', read: false },
        { id: 2, content: 'Notification content 2', time: '11:00 AM', read: true },
    ];
    const count = 10
    return (
        <div className="flex flex-row relative" >
            <div className="flex Notification" onClick={handlePopup}>
                <IconButton aria-label={(count)}>
                    <Badge badgeContent={count} color="error">
                        <FontAwesomeIcon icon={faBell} color="#546869"/>
                    </Badge>
                </IconButton>
            </div>
            {isVisible && (
                <div className='NotificationList'>
                    <div className="absolute top-full z-[999] right-[-160px] rounded-2xl p-3 px-1 shadow-lg border bg-slate-50 w-96 h-auto">
                        <div className="flex flex-col w-full p-2">
                            <div className="flex justify-center items-center">
                                <p className="text-xl font-poppins font-bold">Notifications</p>
                            </div>
                            <Virtuoso className="flex flex-col w-full"
                                data={notifications}
                                style={{ height: '300px' }}
                                itemContent={(index, item) => {
                                    return (
                                        <Link to="/user/profile" onClick={hidePopup}
                                            className="flex flex-row my-1 cursor-pointer p-2 hover:bg-slate-300 justify-start items-center rounded-xl "
                                            key={item.id}
                                            value={item.id}
                                        >
                                            <div className="flex flex-col mx-4">
                                                <p className="max-w-52">{item.content}</p>
                                                <p className="mt-2 text-xs font-bold text-blue-500">{item.time}</p>
                                            </div>
                                            {/* <div className="flex flex-1 justify-end items-end">
                                                <FontAwesomeIcon icon={faCircle} className="text-blue-500" />
                                            </div> */}
                                        </Link>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}
export default NotificationList