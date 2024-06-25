import { useState, useRef, useEffect } from 'react';
import { MenuStatusTrader } from '../Product/MenuProductType';
import { SORT } from '../../const/config'
import { Button, Paginate } from '../Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilterCircleXmark, faLock, faLockOpen, faTruckFast, faBan, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import userService from '../../services/UserService';
import icon from '../../assets/user.png';
import { StarRating } from '../ratingstar'
const Trader = () => {
    const { traderToAdmin, updateStatus } = userService();
    const sortData = Object.keys(SORT);
    const [filter, setFilter] = useState({
        pageCount: 0,
        currentPage: 0,
        totalUser: 0,
        search: '',
        sort: '',
        status: ''
    });
    const [dataUsers, setDataUsers] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(true);
    useEffect(() => {
        if (isSearchClicked) {
            fetchData();
            setIsSearchClicked(false);
        }
    }, [filter, isSearchClicked]);
    const fetchData = async () => {
        try {
            const data = await traderToAdmin.getTraderData(filter.currentPage, filter.search, filter.status, filter.sort);
            if (data && data.total > 0) {
                setDataUsers(data.data)
                setFilter(prevFilter => ({ ...prevFilter, pageCount: data.total_pages, totalUser: data.total }));
            } else {
                setDataUsers([])
                setFilter(prevFilter => ({ ...prevFilter, pageCount: 0, totalUser: 0 }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handlePageClick = (selectedPage) => {
        setFilter(prevFilter => ({ ...prevFilter, currentPage: selectedPage.selected }));
        setIsSearchClicked(true);
    };
    const handleSearchChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, search: event.target.value }));
    };
    const handleSearch = () => {
        setFilter(prevFilter => ({ ...prevFilter, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleSortChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, sort: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleStatusChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, status: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleClearFilter = () => {
        setFilter({
            pageCount: 0,
            currentPage: 0,
            totalUser: 0,
            search: '',
            sort: '',
            status: ''
        });
        setIsSearchClicked(true);
    };
    const handleUpdateClick = async (id, time, status) => {
        try {
            await updateStatus.getData(id, time, status);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
        fetchData();
    };
    return (
        <div className="m-6">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between mt-12">
                <h2
                    style={{ fontFamily: 'Lora, cursive' }}
                    className="hidden lg:block text-xl font-semibold text-gray-900 sm:text-4xl">Danh sách tài xế</h2>

                <div className="xl:w-2/3 lg:w-full flex flex-row justify-between h-[40px]">
                    <button className={`flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#546869] bg-white h-auto w-1/5`}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            id="name_campaign"
                            name="name_campaign"
                            value={filter.search}
                            onChange={handleSearchChange}
                            className={`focus:outline-none focus:border-none w-[90%]`}
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            size="xl"
                            onClick={handleSearch}
                            color={'#74BBA5'}
                        />
                    </button>
                    <Button
                        name='sort_item'
                        className='w-[80px]'
                        title='Trạng thái:'
                        value={filter.status}
                        onChange={handleStatusChange}
                        title1='Mặc định'
                        data={MenuStatusTrader.map((type, key) => (
                            <option key={key} value={type.status}>{type.title}</option>
                        ))}
                    />
                    <Button
                        name='sort_item'
                        className='w-[80px]'
                        title='Đánh giá:'
                        value={filter.sort}
                        onChange={handleSortChange}
                        title1='Mặc định'
                        data={sortData.map((key, index) => (
                            <option key={index} value={key}>{SORT[key]}</option>
                        ))}
                    />
                    <button className="mx-4 mr-20" onClick={handleClearFilter}>
                        <FontAwesomeIcon icon={faFilterCircleXmark} color={'#546869'} size='xl' />
                    </button>
                </div>
            </div>
            {dataUsers.length > 0 ? (
                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 h-[1050px] sm:h-[100%]">
                        {dataUsers?.map((data) => (
                            <div className="flex flex-wrap items-center gap-y-6 py-6" key={data.id}>
                                <div className="w-full lg:w-1/2 flex flex-wrap lg:flex-nowrap">
                                    <dl className="w-1/6 sm:w-1/4 lg:w-1/6">
                                        <dt className="text-base font-medium text-gray-500">Avatar:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <img height={40} width={40} src={data.avatar ? data.avatar : icon} alt="avatar" />
                                        </dd>
                                    </dl>
                                    <dl className="w-1/3 sm:w-1/4 lg:w-1/3">
                                        <dt className="text-base font-medium text-gray-500">Họ và tên:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.name}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Ngày sinh:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.birthday}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Bằng lái xe:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.driving_license_number}</a>
                                        </dd>
                                    </dl>
                                </div>

                                <div className="w-full lg:w-1/2 flex flex-wrap lg:flex-nowrap">
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Biển số xe:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.license_plates}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Tổng đánh giá:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.total_reviews}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Đánh giá:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 flex flex-row">
                                            <StarRating
                                                size={16}
                                                rating={data.average_review_score}
                                            />
                                            <span className="ml-1 text-sm opacity-70">{data.average_review_score}</span>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Trạng thái:</dt>
                                        {data.status === 0 && (
                                            <div className='flex flex-row'>
                                                <button onClick={() => handleUpdateClick(data.id, 2, 1)} className="mt-1.5 text-base font-semibold text-gray-900">
                                                    <FontAwesomeIcon icon={faCircleCheck} color={'green'} size='2x' className='mr-3' />
                                                </button>
                                                <button onClick={() => handleUpdateClick(data.id, 3, '')} className="mt-1.5 text-base font-semibold text-gray-900">
                                                    <FontAwesomeIcon icon={faBan} color={'#C82E0C'} size='2x' />
                                                </button>
                                            </div>
                                        )}
                                        {data.status === 1 && (
                                            <button onClick={() => handleUpdateClick(data.id, 1, 2)} className="mt-1.5 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faLockOpen} color={'#0B4465'} size='2x' className='ml-5' />
                                            </button>
                                        )}
                                        {data.status === 2 && (
                                            <button onClick={() => handleUpdateClick(data.id, 1, 1)} className="mt-1.5 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faLock} color={'#6F0D0D'} size='2x' className='ml-5' />
                                            </button>
                                        )}
                                        {data.status === 3 && (
                                            <div className="mt-1.5 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faTruckFast} color={'#C0B907'} size='2x' className='ml-5' />
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row justify-end'>
                        <Paginate className='w-1/5' handlePageClick={handlePageClick} pageCount={filter.pageCount} />
                    </div>
                </div>
            ) : (
                <div className="text-center mt-8 text-gray-500">
                    Không tìm thấy dữ liệu
                </div>
            )}
        </div>
    )
}

export default Trader