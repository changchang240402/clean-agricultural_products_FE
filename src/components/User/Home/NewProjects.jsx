import React, { useState, useEffect } from 'react';
import ProductCard from '../../Product/ProductCard';
import '../../../index.css'
import itemService from '../../../services/ItemService';
const NewProjects = () => {
    const { newItem } = itemService();
    const [itemData, setItemData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const data = await newItem();
            setItemData(data.item)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div className="container mt-8 mx-auto px-4">
            <div className="sm:flex items-center justify-between">
                <h2 style={{ fontFamily: 'Lora, cursive' }} className="text-4xl font-medium font-lora text-[#546869]">Các sản phẩm mới </h2>
            </div>
            <div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-4"
                data-test="product-list-container"
            >
                {itemData?.map((product, index) => (
                    <ProductCard
                        key={index}
                        product_id={product.id}
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
        </div >
    )
}

export default NewProjects