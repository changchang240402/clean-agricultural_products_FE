import React, { useState, useEffect } from 'react';
import { StarRating } from '../ratingstar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import reviewService from '../../services/ReviewService'
import { formatDateString } from '../../utility/formatdate'
const Review = ({
    id,
    type,
    rating
}) => {
    const [reviews, setReview] = useState([]);
    const { reviewProduct } = reviewService();
    useEffect(() => {
        fetchData();
    }, []);
    const starts = [
        {
            id: 1,
            total: 1,
        },
        {
            id: 2,
            total: 2,
        },
        {
            id: 3,
            total: 0,

        },
        {
            id: 4,
            total: 0,
        },
        {
            id: 5,
            total: 1,
        },
    ]
    const fetchData = async () => {
        try {
            const data = await reviewProduct.getReviewData(id, type);
            if (data) {
                setReview(data.data)
            } else {
                setReview([])
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <>
            {reviews.length > 0 ? (
                <div>
                    <div style={{ fontFamily: 'Lora, cursive' }} className="my-6 gap-8 sm:flex sm:items-start md:my-8">
                        <div className="shrink-0 space-y-3 px-2 py-12 ml-12 flex flex-row">
                            <p className="text-4xl font-semibold leading-none text-gray-900 dark:text-white flex fle">{rating}</p>
                            <p className="text-3xl font-semibold leading-none text-gray-900 dark:text-white flex fle">/5 ({reviews.length})</p>
                        </div>
                        <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
                            {starts?.map((start) => (
                                <div className="flex items-center gap-2">
                                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">{start.id}</p>
                                    <svg className="h-4 w-4 shrink-0 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div style={{ width: `${start.total * 100 / reviews.length}%` }} className="h-1.5 rounded-full bg-yellow-300"></div>
                                    </div>
                                    <a className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left">{start.total} <span className="hidden sm:inline">đánh giá</span></a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2 mb-12">
                        {reviews?.map((review) => (
                            <div key={review.id} className="border-t border-gray-300 w-[95%] ml-5">
                                <div className="flex flex-row mt-5">
                                    <div className="text-center border-gray-200 flex justify-end items-start">
                                        <img className='rounded-3xl' loading="lazy" src={review.user.avatar} height={50} width={50} alt="" />
                                    </div>
                                    <div className="px-4 flex flex-col mb-3">
                                        <p style={{ fontFamily: 'Lora, cursive' }} className="font-semibold text-xlmb-2">{review.user.name}</p>
                                        <span className="text-sm opacity-70">
                                            <FontAwesomeIcon icon={faCalendarDays} className="opacity-70" size='sm' />  {formatDateString(review.created_at)}
                                        </span>
                                        <div className='flex flex-row'>
                                            <StarRating
                                                size={18}
                                                rating={review.number_star}
                                            />
                                            <span className="ml-1 text-sm opacity-70">{review.number_star}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <h3 className="font-semibold text-xl">{username}</h3> */}
                                <p className="text-md opacity-70 mb-5">{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>) : (
                <div className="text-center mt-8 text-gray-500">
                    Sản phẩm chưa có đánh giá bình luận
                </div>
            )}
        </>
    )
}

export default Review