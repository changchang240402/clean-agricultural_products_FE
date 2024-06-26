import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import userService from '../../services/UserService';
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { formatDateHourString } from "../../utility/formatdate"
const NotificationList = () => {
    const [isVisible, setVisible] = useState(false);
    const { notifications, deleteNotifi, updateNotifi } = userService();
    const [notifi, setNotifi] = useState({
        detail: [],
        count: 0
    });
    const handlePopup = async () => {
        setVisible((v) => !v);
        await updateNotifi();
    };
    const hidePopup = () => {
        setVisible(false);
        fetchData();
    };
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    const fetchData = async () => {
        try {
            const data = await notifications();
            setNotifi(prevFilter => ({ ...prevFilter, detail: data.data, count: data.count }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const deleteNotification = async (notifiId) => {
        try {
            await deleteNotifi.geId(notifiId);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
        fetchData();
    };
    return (
        <div className="flex flex-row relative" >
            <div className="flex Notification" onClick={handlePopup}>
                <IconButton aria-label={(notifi.count)}>
                    <Badge badgeContent={notifi.count} color="error">
                        <FontAwesomeIcon icon={faBell} color="#546869" />
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
                                data={notifi.detail}
                                style={{ height: '300px' }}
                                itemContent={(index, item) => {
                                    return (
                                        <div
                                            className={`${item.read === 0 ? "bg-red-100 hover:bg-red-200" : "bg-white hover:bg-gray-100"} flex flex-row my-1 cursor-pointer p-2 justify-start items-center rounded-xl border`}
                                            key={item.id}
                                            value={item.id}
                                        >
                                            <div className="flex flex-col mx-3 w-[100%]">
                                                <Link to={item.link} onClick={hidePopup}>{item.title}</Link>
                                                <div className='flex flex-row justify-between items-center w-[100%]'>
                                                    <p className="mt-2 text-xs font-bold text-blue-500 w-[100%]">{formatDateHourString(item.created_at)}</p>
                                                    {item.notification_type_id === 2 ? ("") : (
                                                        <button type="button" className="text-gray-600 hover:text-blue-800 mb-3" onClick={() => deleteNotification(item.id)}>
                                                            <FontAwesomeIcon icon={faTrashCan} color={'red'} size='xl' className='h-[20px]' />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>
            )
            }
        </div >

    );
}
export default NotificationList