import { useState, useRef, useEffect } from 'react';
import { MenuStatusUser } from '../Product/MenuProductType';
import { SORT } from '../../const/config'
import { Button, Paginate } from '../Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilterCircleXmark, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import userService from '../../services/UserService';
import icon from '../../assets/user.png'

const Seller = () => {
    const { sellerToAdmin } = userService();
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
            const data = await sellerToAdmin.getSellerData(filter.currentPage, filter.search, filter.status, filter.sort);
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
    return (
        <div className="m-6">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between mt-12">
                <h2
                    style={{ fontFamily: 'Lora, cursive' }}
                    className="hidden lg:block text-xl font-semibold text-gray-900 sm:text-4xl">Danh sách cửa hàng</h2>

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
                        title='Trạng thái'
                        value={filter.status}
                        onChange={handleStatusChange}
                        title1='Mặc định'
                        data={MenuStatusUser.map((type, key) => (
                            <option key={key} value={type.id}>{type.title}</option>
                        ))}
                    />
                    <Button
                        name='sort_item'
                        className='w-[80px]'
                        title='Mặt hàng'
                        value={filter.sort}
                        onChange={handleSortChange}
                        title1='Mặc định'
                        data={sortData.map((key, index) => (
                            <option key={index} value={key}>{SORT[key]}</option>
                        ))}
                    />
                    <button onClick={handleClearFilter}>
                        <FontAwesomeIcon icon={faFilterCircleXmark} color={'#546869'} size='xl' />
                    </button>
                </div>
            </div>
            {dataUsers.length > 0 ? (
                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 h-[1050px] sm:h-[100%]">
                        {dataUsers?.map((data) => (
                            <div className="flex flex-wrap items-center gap-y-6 py-6" key={data.id}>
                                <div className="w-full lg:w-3/5 flex flex-wrap lg:flex-nowrap">
                                    <dl className="w-1/6 sm:w-1/5 lg:w-1/6">
                                        <dt className="text-base font-medium text-gray-500">Avatar:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <img height={40} width={40} src={data.avatar ? data.avatar : icon} alt="avatar" />
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/5 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Họ và tên:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.name}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-2/5 sm:w-2/5 lg:w-2/5">
                                        <dt className="text-base font-medium text-gray-500">Email:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.email}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/6 sm:w-1/5 lg:w-1/6">
                                        <dt className="text-base font-medium text-gray-500">Mặt hàng:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.items_count}</a>
                                        </dd>
                                    </dl>
                                </div>

                                <div className="w-full lg:w-2/5 flex flex-wrap lg:flex-nowrap">
                                    <dl className="w-1/4 sm:w-1/5 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Hoạt động:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.total_items_in_use}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/5 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Xác nhận:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.total_items_accept}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-2/4 sm:w-2/5 lg:w-2/5">
                                        <dt className="text-base font-medium text-gray-500">Ngừng hoạt động:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.total_items_archived}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/5 sm:w-1/5 lg:w-1/5">
                                        <dt className="text-base font-medium text-gray-500">Trạng thái:</dt>
                                        {data.status === 1 && (
                                            <button className="mt-1.5 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faLockOpen} color={'#0B4465'} size='2x' className='ml-5' />
                                            </button>
                                        )}
                                        {data.status === 2 && (
                                            <button className="mt-1.5 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faLock} color={'#6F0D0D'} size='2x' className='ml-5' />
                                            </button>
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

export default Seller