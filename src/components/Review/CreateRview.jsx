import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import reviewService from '../../services/ReviewService'
const DraggableModal = ({ isOpen, onClose, type, type_id }) => {
    const { createReview } = reviewService()
    const [rating, setRating] = useState(0);
    const [commentContent, setCommentContent] = useState('');
    if (!isOpen) return null;
    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating); // Cập nhật số sao đánh giá khi người dùng nhấp vào biểu tượng sao
    };
    const handClose = () => {
        onClose();
        setCommentContent('');
        setRating(0);
    }
    const handSubmit = () => {
        try {
            createReview.getReviewData(type, type_id, rating, commentContent);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
        setCommentContent('');
        setRating(0);
        onClose();
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
            <div
                className="bg-white rounded shadow-lg w-1/2 max-w-lg"
                style={{ position: 'absolute' }}
            >
                <div className="flex flex-row justify-between border-b px-4 py-2 cursor-move">
                    <h3 style={{ fontFamily: 'Lora, cursive' }} className="text-4xl font-medium font-lora text-[#65B599]">Đánh giá</h3>
                    <button className="border bg-red-600 h-[20px] w-[20px] text-white" onClick={handClose}>X</button>
                </div>
                <div className="p-4">
                    <form>
                        <div className="mb-4 flex flex-col justify-center items-center">
                            <span className="text-lg text-gray-800 mb-3">Bạn thấy chất lượng thế nào!</span>
                            <div className="flex space-x-3">
                                {/* Bạn có thể thay đổi onClick cho mỗi biểu tượng sao để gọi handleRatingClick với số sao tương ứng */}
                                <FontAwesomeIcon icon={faStar} size='2xl' color={rating >= 1 ? '#fbbf24' : 'gray'} onClick={() => handleRatingClick(1)} />
                                <FontAwesomeIcon icon={faStar} size='2xl' color={rating >= 2 ? '#fbbf24' : 'gray'} onClick={() => handleRatingClick(2)} />
                                <FontAwesomeIcon icon={faStar} size='2xl' color={rating >= 3 ? '#fbbf24' : 'gray'} onClick={() => handleRatingClick(3)} />
                                <FontAwesomeIcon icon={faStar} size='2xl' color={rating >= 4 ? '#fbbf24' : 'gray'} onClick={() => handleRatingClick(4)} />
                                <FontAwesomeIcon icon={faStar} size='2xl' color={rating >= 5 ? '#fbbf24' : 'gray'} onClick={() => handleRatingClick(5)} />
                            </div>
                        </div>
                        <div className="border border-gray rounded-md">
                            <textarea
                                id="comment"
                                name="comment"
                                className="h-20 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Hãy đánh giá để chúng tôi có thể hoàn hiện hơn "
                                required
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex justify-end border-t mt-5">
                            <div onClick={handClose} className="mr-3 w-full inline-flex justify-center rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-orange-900 hover:bg-orange-100 hover:text-orange-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-orange-100 lg:w-1/5">
                                Hủy
                            </div>
                            <div onClick={handSubmit} className="mr-3 w-full inline-flex justify-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-100 lg:w-1/5">
                                Đăng
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DraggableModal;

