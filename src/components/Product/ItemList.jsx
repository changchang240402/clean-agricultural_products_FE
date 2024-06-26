import { useState, useRef, useEffect } from 'react';
import { MenuStatusItem } from '../Product/MenuProductType';
import { Button, Paginate } from '../Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSquarePlus, faMagnifyingGlass, faFilterCircleXmark, faLock, faLockOpen, faHourglassHalf, faBan, faCircleCheck, faPenToSquare, faEraser, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import itemService from '../../services/ItemService';
import { Link } from "react-router-dom";
import { encodeId } from '../../utility/utils';
const ItemList = ({ role, pathname }) => {
    const { listItem, itemWarning, itemBan, itemUnBan, updateStatus } = itemService();
    const [filter, setFilter] = useState({
        pageCount: 0,
        currentPage: 0,
        totalItem: 0,
        search: '',
        status: ''
    });
    const priceColor = (price, price_max, price_min) => {
        const parsedPrice = parseFloat(price);
        const parsedPriceMax = parseFloat(price_max);
        const parsedPriceMin = parseFloat(price_min);
        if (parsedPrice >= parsedPriceMin && parsedPrice <= parsedPriceMax) {
            return 'text-green-500';
        } else {
            return 'text-red-500';
        }
    };
    const color = (noti) => {
        if (noti >= 1) {
            return 'text-red-500';
        }
    };
    const truncateItemName = (name) => (name.length > 80 ? name.slice(0, 80) + '...' : name);
    const [dataItems, setDataItems] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(true);
    useEffect(() => {
        if (isSearchClicked) {
            fetchData();
            setIsSearchClicked(false);
        }
    }, [filter, isSearchClicked]);
    const fetchData = async () => {
        try {
            const data = await listItem.getItemData(filter.currentPage, filter.search, filter.status);
            if (data && data.total > 0) {
                setDataItems(data.data)
                setFilter(prevFilter => ({ ...prevFilter, pageCount: data.total_pages, totalItem: data.total }));
            } else {
                setDataItems([])
                setFilter(prevFilter => ({ ...prevFilter, pageCount: 0, totalItem: 0 }));
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
    const handleStatusChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, status: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleClearFilter = () => {
        setFilter({
            pageCount: 0,
            currentPage: 0,
            totalItem: 0,
            search: '',
            status: ''
        });
        setIsSearchClicked(true);
    };
    const handleWarning = async () => {
        try {
            itemWarning();
            fetchData();
        } catch (error) {
            console.error('Error warning file:', error);
        }
    };
    const handleBan = async () => {
        try {
            itemBan();
            fetchData();
        } catch (error) {
            console.error('Error warning file:', error);
        }
    };
    const handleUnBan = async () => {
        try {
            itemUnBan();
            fetchData();
        } catch (error) {
            console.error('Error warning file:', error);
        }
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
                    className="text-xl font-semibold text-gray-900 sm:text-4xl hidden lg:block">Danh sách mặt hàng</h2>

                <div className="xl:w-2/3 lg:w-full sm:w-full flex flex-row justify-between h-[40px]">
                    <button className={`flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#546869] bg-white h-auto w-1/4 sm:w-1/4`}>
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
                        title='Loại:'
                        value={filter.status}
                        onChange={handleStatusChange}
                        title1='Mặc định'
                        data={MenuStatusItem.map((type, key) => (
                            <option key={key} value={type.status}>{type.title}</option>
                        ))}
                    />
                    {role === 2 && (
                        <Link
                            to="/seller/createItem"
                            className="w-[100px] inline-flex justify-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-[100px]">
                            <FontAwesomeIcon icon={faSquarePlus} size='xl' className="mr-3" />
                            Tạo
                        </Link>

                    )}
                    {role === 0 && (
                        <div className='flex flex-row'>
                            <button onClick={handleWarning} className="w-[120px] inline-flex justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-900 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-[120px] mr-3">
                                <FontAwesomeIcon icon={faTriangleExclamation} size='xl' className="mr-3" />
                                Cảnh báo
                            </button>
                            <button onClick={handleBan} className="w-[120px] inline-flex justify-center rounded-lg border border-[#A65E2A] bg-white px-3 py-2 text-sm font-medium text-[#A65E2A] hover:bg-[#FAD9C2] hover:text-[#A65E2A] focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-[120px] mr-3">
                                <FontAwesomeIcon icon={faLock} size='xl' className="mr-3" />
                                Khóa
                            </button>
                            <button onClick={handleUnBan} className="w-[120px] inline-flex justify-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-[120px]">
                                <FontAwesomeIcon icon={faLockOpen} size='xl' className="mr-3" />
                                Mở khóa
                            </button>
                        </div>

                    )}
                    <button onClick={handleClearFilter}>
                        <FontAwesomeIcon icon={faFilterCircleXmark} color={'#546869'} size='xl' />
                    </button>
                </div>
            </div>
            {dataItems.length > 0 ? (
                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 h-[1050px] sm:h-[100%]">
                        {dataItems?.map((data) => (
                            <div className="flex flex-wrap items-center gap-y-6 py-6" key={data.id}>
                                <div className="w-full lg:w-1/2 flex flex-wrap lg:flex-nowrap">
                                    <dl className="w-1/6 sm:w-1/5 lg:w-1/6">
                                        <dt className="text-base font-medium text-gray-500">Hình ảnh:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <img height={80} width={80} src={data.image} alt="avatar" />
                                        </dd>
                                    </dl>
                                    <dl className="w-1/2 sm:w-2/5 lg:w-1/2">
                                        <dt className="text-base font-medium text-gray-500">Tên:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{truncateItemName(data.item_name)}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/5 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Loại:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{data.product.product_name}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/5 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Giá thấp nhất:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{Number(data.product.price_min).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} / kg</a>
                                        </dd>
                                    </dl>
                                </div>

                                <div className="w-full lg:w-1/2 flex flex-wrap lg:flex-nowrap lg:h-[110px] sm:h-auto">
                                    <dl className="w-1/4 sm:w-1/5 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Giá mặt hàng:</dt>
                                        <dd className={`mt-1.5 text-base font-semibold ${priceColor(data.price, data.product.price_max, data.product.price_min)}`}>
                                            <a className="hover:underline">{Number(data.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} / kg</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-2/5 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Giá cao nhất:</dt>
                                        <dd className="mb-1.5 text-base font-semibold text-gray-900">
                                            <a className="hover:underline">{Number(data.product.price_max).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} / kg</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/5 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500">Lần cảnh báo:</dt>
                                        <dd className={`mt-1.5 text-base font-semibold ${color(data.notifications)}`}>
                                            <a className="hover:underline">{data.notifications}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/5 lg:w-1/4 flex flex-row">
                                        {role === 0 && data.status === 2 && (
                                            <div className='flex flex-row'>
                                                <button onClick={() => handleUpdateClick(data.id, 2, 0)} className="mb-8 text-base font-semibold text-gray-900">
                                                    <FontAwesomeIcon icon={faCircleCheck} color={'green'} size='2x' className='mr-3' />
                                                </button>
                                                <button onClick={() => handleUpdateClick(data.id, 3, '')} className="mb-8 text-base font-semibold text-gray-900">
                                                    <FontAwesomeIcon icon={faBan} color={'#C82E0C'} size='2x' />
                                                </button>
                                            </div>
                                        )}
                                        {role === 2 && data.status === 2 && (
                                            <button className="mb-8 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faHourglassHalf} color={'#DD8534'} size='2x' className='ml-5 mr-3' />
                                            </button>
                                        )}
                                        {data.status === 0 && (
                                            <button onClick={() => role === 0 ? handleUpdateClick(data.id, 1, 1) : handleUpdateClick(data.id, 1, 3)} className="mb-8 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faLockOpen} color={'#0B4465'} size='2x' className='ml-5' />
                                            </button>
                                        )}
                                        {data.status === 1 && (
                                            <button onClick={() => role === 0 ? handleUpdateClick(data.id, 1, 0) : ""} className="mb-8 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faLock} color={'#6F0D0D'} size='2x' className='ml-5' />
                                            </button>
                                        )}
                                        {data.status === 3 && (
                                            <button onClick={() => role === 2 ? handleUpdateClick(data.id, 1, 0) : ""} className="mb-8 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faEraser} color={'gray'} size='2x' className='ml-5' />
                                            </button>
                                        )}
                                        {role === 2 && (
                                            <Link to="/seller/updateItem" state={{ itemData: data }}
                                                className="mt-5 text-base font-semibold text-gray-900">
                                                <FontAwesomeIcon icon={faPenToSquare} color={'green'} size='2x' className='ml-3' />
                                            </Link>
                                        )}
                                        <Link to={{ pathname: `${pathname}${encodeId(data.id)}` }} className="mt-5 text-base font-semibold text-gray-900">
                                            <FontAwesomeIcon icon={faEye} color={'black'} size='2x' className='ml-3' />
                                        </Link>
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

export default ItemList