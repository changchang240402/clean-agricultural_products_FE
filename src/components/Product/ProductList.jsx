import { useState, useRef, useEffect } from 'react';
import { MenuProductType } from '../Product/MenuProductType';
import { SORT } from '../../const/config'
import { Button, Paginate } from '../Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faFilterCircleXmark, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import productService from '../../services/ProductService';

const ProductList = ({ role }) => {
    const { productList } = productService();
    const sortData = Object.keys(SORT);
    const [filter, setFilter] = useState({
        pageCount: 0,
        currentPage: 0,
        totalProduct: 0,
        id: '',
        sort: '',
    });
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const [dataProducts, setDataProducts] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(true);
    useEffect(() => {
        if (isSearchClicked) {
            fetchData();
            setIsSearchClicked(false);
        }
    }, [filter, isSearchClicked]);
    const fetchData = async () => {
        try {
            const data = await productList.getProductData(filter.currentPage, filter.id, filter.sort);
            if (data && data.total > 0) {
                setDataProducts(data.data)
                setFilter(prevFilter => ({ ...prevFilter, pageCount: data.total_pages, totalProduct: data.total }));
            } else {
                setDataProducts([])
                setFilter(prevFilter => ({ ...prevFilter, pageCount: 0, totalProduct: 0 }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handlePageClick = (selectedPage) => {
        setFilter(prevFilter => ({ ...prevFilter, currentPage: selectedPage.selected }));
        setIsSearchClicked(true);
    };
    const handleSortChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, sort: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleIdChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, id: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };
    const handleClearFilter = () => {
        setFilter({
            pageCount: 0,
            currentPage: 0,
            totalProduct: 0,
            id: '',
            sort: '',
        });
        setIsSearchClicked(true);
    };
    return (
        <div className="m-6">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between mt-12">
                <h2
                    style={{ fontFamily: 'Lora, cursive' }}
                    className="text-xl font-semibold text-gray-900 dark:text-white sm:text-4xl hidden lg:block">Danh sách sản phẩm</h2>

                <div className="xl:w-2/3 lg:w-full flex flex-row justify-between h-[40px]">
                    <Button
                        name='sort_item'
                        className='w-[80px]'
                        title='Loại:'
                        value={filter.id}
                        onChange={handleIdChange}
                        title1='Mặc định'
                        data={MenuProductType.map((type, key) => (
                            <option key={key} value={type.id}>{type.title}</option>
                        ))}
                    />
                    <Button
                        name='sort_item'
                        className='w-[80px]'
                        title='Mặt hàng:'
                        value={filter.sort}
                        onChange={handleSortChange}
                        title1='Mặc định'
                        data={sortData.map((key, index) => (
                            <option key={index} value={key}>{SORT[key]}</option>
                        ))}
                    />
                    {role === 0 && (
                        <div className='flex flex-row w-1/3 items-center justify-center'>
                            <input
                                className="h-[40px] relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded-2xl border-2 border-[#546869] bg-transparent bg-clip-padding px-3 py-1 text-base font-normal leading-[2] text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-1 file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-1 file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
                                id="formFileLg"
                                type="file" />
                            <button className='ml-3'>
                                <FontAwesomeIcon icon={faCloudArrowUp} size='xl' />
                            </button>
                        </div>
                    )}
                    <button onClick={handleClearFilter}>
                        <FontAwesomeIcon icon={faFilterCircleXmark} color={'#546869'} size='xl' />
                    </button>
                </div>
            </div>
            {dataProducts.length > 0 ? (
                <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700 h-[1050px] sm:h-[100%]">
                        {dataProducts?.map((data) => (
                            <div className="flex flex-wrap items-center gap-y-6 py-6" key={data.id}>
                                <div className={`w-[95%] flex flex-wrap lg:flex-nowrap ${role === 2 ? 'ml-12' : ''}`}>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tên:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            <a className="hover:underline">{data.product_name}</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Giá thấp nhất:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            <a className="hover:underline">{Number(data.price_min).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} / kg</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Giá cao nhất:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            <a className="hover:underline">{Number(data.price_max).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} / kg</a>
                                        </dd>
                                    </dl>
                                    <dl className="w-1/4 sm:w-1/4 lg:w-1/4">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tổng mặt hàng:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            <a className="hover:underline">{data.total_items}</a>
                                        </dd>
                                    </dl>
                                </div>
                                {role === 0 && (
                                    <div className="w-[5%] flex flex-wrap lg:flex-nowrap">
                                        <dl className="w-1/5 sm:w-1/4 lg:w-1/5">
                                            <button className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                <FontAwesomeIcon icon={faPenToSquare} color={'green'} size='2x' />
                                            </button>
                                        </dl>
                                    </div>
                                )}
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

export default ProductList