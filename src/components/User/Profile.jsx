import React, { useState, useEffect } from 'react';
import Mapbox from '../Logo/MapBox'
import AuthService from '../../services/AuthService'
import Review from '../Review/Review';
import ListOrder from '../OrderDetail/ListOrder';
const Profile = () => {
    const icon = 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
    const { getUserProfile } = AuthService();
    const [user, setUser] = useState({
        detail: {}
    });
    const [currentPosition, setCurrentPosition] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const [showMapbox, setShowMapbox] = useState(true);
    const fetchData = async () => {
        try {
            const data = await getUserProfile();
            setUser(prevFilter => ({ ...prevFilter, detail: data }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Current position:", { latitude, longitude });
                    setCurrentPosition({ latitude, longitude });
                },
                (error) => {
                    switch (error.code) {
                        case 1:
                            setError("Permission denied. Please allow location access.");
                            break;
                        case 2:
                            setError("Position unavailable.");
                            break;
                        case 3:
                            setError("Timeout while fetching location.");
                            break;
                        default:
                            setError("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div className="flex flex-col">
            <img src="https://i.vnbusiness.vn/2023/04/24/-1382-1682330156_860x0.jpg" alt="User Cover"
                className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]" />

            <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
                <img src={user.detail.avatar ? user.detail.avatar : icon} alt="User Profile"
                    className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-green-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]" />

                <h1
                    className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                    {user.detail.name}</h1>

            </div>

            <div
                className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                    <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                        <div className="w-full">
                            <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                    <dd className="text-lg font-semibold">{user.detail.email}</dd>
                                </div>
                                {user.detail.role == 3 ? (
                                    <div className='text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700'>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Ngày sinh</dt>
                                            <dd className="text-lg font-semibold">{user.detail.birthday}</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Loại xe</dt>
                                            <dd className="text-lg font-semibold">{user.detail.vehicles}</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Trọng tải</dt>
                                            <dd className="text-lg font-semibold">{user.detail.payload} Kg</dd>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700'>
                                        <div className="flex flex-col py-3 border-b">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Họ và tên</dt>
                                            <dd className="text-lg font-semibold">{user.detail.name}</dd>
                                        </div>
                                    </div>
                                )}
                            </dl>
                        </div>
                        <div className="w-full">
                            <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Địa chỉ</dt>
                                    <dd className="text-lg font-semibold">{user.detail.address}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Số điện thoại</dt>
                                    <dd className="text-lg font-semibold">{user.detail.phone}</dd>
                                </div>
                                {user.detail.role == 3 ? (
                                    <div className='text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700'>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Bằng lái xe</dt>
                                            <dd className="text-lg font-semibold">{user.detail.driving_license_number}</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Biển số xe</dt>
                                            <dd className="text-lg font-semibold">{user.detail.license_plates}</dd>
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </dl>
                        </div>
                    </div>
                    <div className='flex flex-row mt-5'>
                        <h1
                            style={showMapbox ? { fontFamily: 'Lora, cursive' } : null}
                            className={`w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 text-[#546869] ${showMapbox ? 'border-[#FF8682]' : 'border-transparent'} dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-2xl xs:text-xl cursor-pointer mr-5`}
                            onClick={() => setShowMapbox(true)}>
                            Vị trí của bạn
                        </h1>
                        {user.detail.role == 1 ? (
                            <h1
                                style={!showMapbox ? { fontFamily: 'Lora, cursive' } : null}
                                className={`w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 text-[#546869] ${!showMapbox ? 'border-[#FF8682]' : 'border-transparent'} dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-2xl xs:text-xl cursor-pointer`}
                                onClick={() => setShowMapbox(false)}>
                                Đơn hàng của bạn
                            </h1>
                        ) : (
                            <h1
                                style={!showMapbox ? { fontFamily: 'Lora, cursive' } : null}
                                className={`w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 text-[#546869] ${!showMapbox ? 'border-[#FF8682]' : 'border-transparent'} dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-2xl xs:text-xl cursor-pointer`}
                                onClick={() => setShowMapbox(false)}>
                                Bình luận, đánh giá
                            </h1>
                        )}
                    </div>
                    {showMapbox ? (
                        <div className="my-10 lg:w-[70%] md:h-[28rem] xs:w-full xs:h-[24rem]">
                            {error === "Permission denied. Please allow location access." && (
                                <div>
                                    Please allow location access in your browser settings.
                                </div>
                            )}
                            {currentPosition.latitude === null || currentPosition.longitude === null ? (
                                <div>Loading map...</div>
                            ) : (
                                <Mapbox
                                    width={'100%'}
                                    height={"100%"}
                                    latitude={currentPosition.latitude}
                                    longitude={currentPosition.longitude}
                                    zoom={10.5}
                                    name={'Bạn'}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="my-10 lg:w-[100%] md:h-[100%] xs:w-full xs:h-[100%]">
                            {user.detail.role == 1 ? (
                                <ListOrder pathname={'/user/tracking/'} />
                            ) : (
                                <Review id={user.detail.id} type={0} rating={5} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Profile