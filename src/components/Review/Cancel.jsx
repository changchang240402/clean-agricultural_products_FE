import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelError } from "../Components";
// Define the schema for validation
const schema = yup.object({
    comment: yup.string()
        .required('Không được để trống'),
});

const CancelModal = ({ isOpen, onClose, content, setContent, handleUpdateClick }) => {
    // Initialize form handling with validation schema
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Function to handle form submission
    const onSubmit = (data) => {
        setContent(data.comment);
    };

    // Function to handle modal close
    const handleClose = () => {
        onClose();
        setContent(null);
    };

    // UseEffect to handle updates when `content` changes
    useEffect(() => {
        if (content) {
            handleUpdateClick();
            setContent(null); // Reset content to null after update
        }
    }, [content, handleUpdateClick]);

    // Render the modal conditionally based on `isOpen`
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded shadow-lg w-1/2 max-w-lg">
                <div className="flex flex-row justify-between border-b px-4 py-2">
                    <h3 className="text-4xl font-medium text-[#65B599]">Lý do</h3>
                    <button className="border bg-red-600 h-[20px] w-[20px] text-white" onClick={handleClose}>X</button>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="border border-gray-300 rounded-md">
                            <textarea
                                id="comment"
                                name="comment"
                                className="h-20 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Hãy cho chúng tôi biết lý do"
                                {...register("comment")}
                            ></textarea>
                            {errors.comment && (
                                <LabelError name="comment" error={errors.comment.message} />
                            )}
                        </div>
                        <div className="flex justify-end border-t mt-5">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="mr-3 w-full lg:w-1/5 inline-flex justify-center rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-orange-900 hover:bg-orange-100 hover:text-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-100"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="w-full lg:w-1/5 inline-flex justify-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            >
                                Đăng
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CancelModal;
