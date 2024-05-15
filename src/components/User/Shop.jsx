import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot, faFilterCircleXmark, faSeedling } from '@fortawesome/free-solid-svg-icons'
import { Button, Paginate } from '../Components';
import ProductCard from '../Product/ProductCard';
import { provinces } from '../Product/MenuProductType';
import userService from '../../services/UserService';
import icon from '../../assets/shop.png'


const Shop = () => {
    const { shop } = userService();
    const [filter, setFilter] = useState({
        search: '',
        address: '',
        totalShop: 0,
    });
    const [shopData, setShopData] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(true);
    useEffect(() => {
        if (isSearchClicked) {
            fetchData();
            setIsSearchClicked(false);
        }
    }, [filter, isSearchClicked]);

    const fetchData = async () => {
        try {
            const data = await shop.getShopData(filter.search, filter.address);
            if (data.total > 0) {
                setShopData(data.shop)
                setFilter(prevFilter => ({ ...prevFilter, totalShop: data.total }));
            } else {
                setShopData([])
                setFilter(prevFilter => ({ ...prevFilter, totalShop: 0 }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSearchChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, search: event.target.value }));
    };
    const handleAddressChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, address: event.target.value }));
        setIsSearchClicked(true);
    };
    const handleSearch = () => {
        setIsSearchClicked(true);
    };
    const handleClearFilter = () => {
        setFilter({
            search: '',
            address: '',
            totalShop: 0,
        });
        setIsSearchClicked(true);
    };
    return (
        <>
            <div className="container mt-8 mx-auto px-4">
                <div className="grid grid-cols-4">
                    <div className="col-span-4 space-y-4 w-[100%]">
                        <div className="flex items-center justify-between mb-10">
                            <div className="xl:w-1/4 lg:w-1/5 flex flex-col">
                                <p style={{ fontFamily: 'Lora, cursive' }} className='text-xl font-bold text-[#546869]'>Các cửa hàng đang hoạt động</p>
                                <p className='text-[#546869] opacity-70 font-medium text-sm'>Tìm thấy {filter.totalShop} cửa hàng phù hợp</p>
                            </div>
                            <div className="xl:w-3/4 lg:w-4/5 flex flex-row justify-between h-[40px]">
                                <button className={`flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#546869] bg-white h-auto lg:w-[200px]`}>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm cửa hàng"
                                        id="name_campaign"
                                        name="name_campaign"
                                        value={filter.search}
                                        onChange={handleSearchChange}
                                        className={`focus:outline-none focus:border-none lg:w-[150px]`}
                                    />
                                    <FontAwesomeIcon
                                        icon={faMagnifyingGlass}
                                        size="xl"
                                        onClick={handleSearch}
                                        color={'#74BBA5'}
                                    />
                                </button>
                                <Button
                                    name='provinces'
                                    title='Địa chỉ:'
                                    value={filter.address}
                                    onChange={handleAddressChange}
                                    title1='Tất cả'
                                    data={provinces.map((key, index) => (
                                        <option key={index} value={key}>{key}</option>
                                    ))}
                                />
                                <button className="mx-4 mr-20"
                                    onClick={handleClearFilter}
                                >
                                    <FontAwesomeIcon icon={faFilterCircleXmark} color={'#546869'} size='xl' />
                                </button>
                            </div>
                        </div>
                        <div>
                            {shopData.length > 0 ? (
                                <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2">
                                    {shopData.map(shop => (
                                        <div key={shop.id}>
                                            <div className={`flex flex-row border-2 border-gray-300 mb-5 rounded-sm items-center px-2 pt-2 py-2 h-[100px]`}>
                                                <div className="text-center border-gray-200 flex justify-end items-center">
                                                    <img className='rounded-3xl ml-5' loading="lazy" src={shop.avatar ? shop.avatar : icon} height={50} width={50} alt="" />
                                                </div>
                                                <div className="px-4 ">
                                                    <p style={{ fontFamily: 'Lora, cursive' }} className="text-gray-500 text-[18px] font-bold mb-2">{shop.name}</p>
                                                    <div className='flex flex-row'>
                                                        <FontAwesomeIcon icon={faSeedling} color={'#546869'} size='sm' />
                                                        <p style={{ fontFamily: 'Karla, cursive' }} className="text-gray-500 text-[16px] mb-2 ml-1">{shop.total_items} sản phẩm</p>
                                                    </div>
                                                    <div className='flex flex-row'>
                                                        <FontAwesomeIcon icon={faLocationDot} color={'#546869'} size='sm' />
                                                        <p style={{ fontFamily: 'Karla, cursive' }} className="text-gray-500 text-[12px] mb-2 ml-2">{shop.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center mt-8 text-gray-500">
                                    Không tìm thấy dữ liệu
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop