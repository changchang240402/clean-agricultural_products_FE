import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCalendar, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Button, Paginate } from '../Components';
import ProductCard from '../Product/ProductCard';
import { MenuProductType } from '../Product/MenuProductType';
import productService from '../../services/ProductService';
import { SORT } from '../../const/config'
import itemService from '../../services/ItemService';
const Product = () => {
    const sortData = Object.keys(SORT);
    const { itemToUser } = itemService()
    const [filter, setFilter] = useState({
        pageCount: 0,
        currentPage: 0,
        totalItem: 0,
        search: '',
        itemSort: '',
        product: ''
    });
    const { productType } = productService();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
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
            const data = await itemToUser.getItemData(filter.currentPage, filter.search, filter.product, filter.itemSort);
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
    const handleItemSortChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, itemSort: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleItemProductChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, product: event, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleSearch = () => {
        setFilter(prevFilter => ({ ...prevFilter, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleClearFilter = () => {
        setFilter({
            pageCount: 0,
            currentPage: 0,
            totalItem: 0,
            search: '',
            itemSort: '',
            product: ''
        });
        setIsSearchClicked(true);
    };
    const handleCategoryClick = async (id) => {
        if (selectedCategory === id) {
            setSelectedCategory(null);
            setCategoryData([]);
        } else {
            setSelectedCategory(id);
            const data = await productType.getProductData(id);
            setCategoryData(data.product);
        }
    };
    return (
        <>
            <div className="mx-[10px] my-[20px] p-4 font-karla w-[100%]">
                <div className="grid grid-cols-5">
                    <div className="col-span-1 ml-10px">
                        <h1 style={{ fontFamily: 'Lora, cursive' }} className="font-bold mb-2 text-[#546869] text-xl">Các loại thực phẩm</h1>
                        <ul>
                            {MenuProductType.map(type => (
                                <li style={{ cursor: 'pointer' }} key={type.id} onClick={() => handleCategoryClick(type.id)}>
                                    <div className={`flex flex-row border-2 ${type.color} w-[80%] mt-5 rounded-2xl items-center`}>
                                        <div className="text-center border-gray-200">
                                            <img className='rounded-3xl ml-5' loading="lazy" src={type.icon} height={40} width={40} alt="" />
                                        </div>
                                        <div className="px-4 pt-4 py-2">
                                            <p style={{ fontFamily: 'Lora, cursive' }} className="text-gray-500 text-[16px] font-medium mb-2">{type.title}</p>
                                        </div>
                                    </div>
                                    {selectedCategory === type.id && (
                                        <ul>
                                            {categoryData.map((item, index) => (
                                                <li key={index}>
                                                    <div className={`flex flex-col border-2 w-[80%] rounded-2xl px-4 pt-2 py-1`} onClick={() => handleItemProductChange(item.id)}>
                                                        <p style={{ fontFamily: 'Lora, cursive' }} className="text-gray-500 text-[18px] font-medium mb-2">{item.product_name} ({item.total_items})</p>
                                                        <p style={{ fontFamily: 'Lora, cursive' }} className="text-gray-500 text-[16px] font-medium mb-2">
                                                            ({Number(item.price_min).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            ~
                                                            {Number(item.price_max).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })})/Kg
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-4 space-y-4 w-[100%]">
                        <div className="flex items-center justify-between">
                            <div className="xl:w-1/2 lg:w-1/3 flex flex-col">
                                <p style={{ fontFamily: 'Lora, cursive' }} className='text-xl font-bold text-[#546869]'>Các sản phẩm hiện có</p>
                                <p className='text-[#546869] opacity-70 font-medium text-sm'>Tìm thấy {filter.totalItem} sản phẩm phù hợp</p>
                            </div>
                            <div className="xl:w-1/2 lg:w-2/3 flex flex-row justify-between h-[40px]">
                                <button className={`flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#546869] bg-white h-auto lg:w-[200px]`}>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm sản phẩm"
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
                                    name='sort_item'
                                    className='w-[80px]'
                                    title='Giá:'
                                    value={filter.itemSort}
                                    onChange={handleItemSortChange}
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
                        {dataItems.length > 0 ? (
                            <div className='flex flex-col justify-end'>
                                <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2">
                                    {dataItems?.map((product, index) => (
                                        <ProductCard
                                            key={index}
                                            id={product.id}
                                            item_name={product.item_name}
                                            product_name={product.product_name}
                                            price={product.price}
                                            price_type={product.price_type}
                                            rating={product.average_review_score}
                                            total_rating={product.total_reviews}
                                            quantity_sold={product.total_orders}
                                            image={product.image}
                                        />
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
                </div>
            </div>
        </>
    )
}

export default Product