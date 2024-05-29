import '../index.css'
import * as React from "react"
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faHourglassHalf, faCheck, faXmark, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
const Input = React.forwardRef(function Input(props, ref) {
    const { className, name, placeholder, register } = props;
    return (
        <input
            className={`px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#546869] bg-white ${className}`}
            type={name}
            placeholder={placeholder}
            id={name}
            name={name}
            {...register}
        />
    );
});

const LabelError = React.forwardRef(function LabelError(props, ref) {
    const { name, error } = props;
    return (
        <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor={name}>{error}</label>
    );
});

const Label = React.forwardRef(function Label(props, ref) {
    const { className, name, title } = props;
    return (
        <label
            style={{ fontFamily: 'Lobster, cursive' }}
            className={`font-medium text-xl text-[#546869] mb-2 ${className}`}
            htmlFor={name}>
            {title}
        </label>
    );
});

const Component = React.forwardRef(function Component(props, ref) {
    const { className, name, title, placeholder, register, error, className1, className2 } = props;
    return (
        <div className={`flex flex-col mt-2 ${className}`}>
            <Label name={name} title={title} className={className1} />
            <Input name={name} placeholder={placeholder}
                register={register} className={className2} />
            {error && (
                <LabelError name={name} error={error.message} />
            )}
        </div>
    );
});
const Paginate = React.forwardRef(function Paginate(props, ref) {
    const { className, handlePageClick, pageCount } = props;
    return (
        <div className={`flex items-center justify-end ${className}`}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=" > "
                onPageChange={handlePageClick}
                Displayed Page Range={5}
                pageCount={pageCount}
                previousLabel=" < "
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageClassName="page-item"
                activeClassName="active"
                previousClassName="page-item"
                nextClassName="page-item"
                breakClassName="page-item"
                className='flex items-center flex-row h-[50px]'
            />
        </div>
    );
});
const Button = React.forwardRef(function Button(props, ref) {
    const { name, title, value, onChange, title1, data, className1, className2 } = props;
    return (
        <button className={`flex items-center flex-row px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#546869] h-auto ${className1}`}>
            <p className="justify-center font-bold">{title} </p>
            <select
                className={`selectpicker focus:outline-none focus:border-none bg-white justify-center ${className2}`}
                data-width="2px"
                aria-label="None"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value=''>{title1}</option>
                {data}
            </select>
        </button>
    );
});
const StatusOrder = React.forwardRef(function StatusOrder(props, ref) {
    const { status } = props;

    const getStatusComponent = (status) => {
        switch (status) {
            case 2:
                return (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300 w-[105px]">
                        <FontAwesomeIcon icon={faHourglassHalf} color={'blue'} className='mr-1 w-[15px]' />
                        Chuẩn bị
                    </dd>
                );
            case 3:
                return (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 w-[105px]">
                        <FontAwesomeIcon icon={faTruckFast} color={'#C0B907'} className='mr-1 w-[15px]' />
                        Vận chuyển
                    </dd>
                );
            case 4:
                return (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 w-[105px]">
                        <FontAwesomeIcon icon={faCheck} color={'green'} className='mr-1 w-[15px]' />
                        Hoàn thành
                    </dd>
                );
            case 5:
                return (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800 dark:bg-violet-900 dark:text-violet-300 w-[105px]">
                        <FontAwesomeIcon icon={faRotateLeft} color={'#5907C0'} className='mr-1 w-[15px]' />
                        Trả hàng
                    </dd>
                );
            case 6:
                return (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300 w-[105px]">
                        <FontAwesomeIcon icon={faXmark} color={'#CA1616'} className='mr-1 w-[15px]' />
                        Đã hủy
                    </dd>
                );
            default:
                return null;
        }
    };

    return (
        <div ref={ref}>
            {getStatusComponent(status)}
        </div>
    );
});
export { Label, Input, LabelError, Component, Paginate, Button, StatusOrder };