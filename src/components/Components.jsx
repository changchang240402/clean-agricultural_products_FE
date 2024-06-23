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

const Label2 = React.forwardRef(function Label(props, ref) {
    const { className, name, title } = props;
    return (
        <label
            style={{ fontFamily: 'Lora, cursive' }}
            className={`font-medium text-xl text-[#546869] ${className}`}
            htmlFor={name}>
            {title}
        </label>
    );
});
const Component2 = React.forwardRef(function Component(props, ref) {
    const { className, name, title, placeholder, register, error, className1, className2 } = props;
    return (
        <div className={`flex flex-col mt-2 ${className}`}>
            <Label2 name={name} title={title} className={className1} />
            <Input name={name} placeholder={placeholder}
                register={register} className={className2} />
            {error && (
                <LabelError name={name} error={error.message} />
            )}
        </div>
    );
});
const Component3 = React.forwardRef(function Component(props, ref) {
    const { className, name, title, placeholder, register, error, className1, className2, unit } = props;
    return (
        <div className={`flex flex-col mt-2 ${className}`}>
            <Label2 name={name} title={title} className={className1} />
            <div className='flex items-center'>
                <input
                    className={`rounded-tl-2xl rounded-bl-2xl px-4 py-3 shadow-sm border-2 bg-white ${className2}`}
                    type={name}
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    {...register}
                />
                {unit && <span className='px-3 py-3 shadow-sm border-4 flex items-center justify-center rounded-tr-2xl rounded-br-2xl bg-gray-200'>{unit}</span>}
            </div>
            {error && (
                <LabelError name={name} error={error.message} />
            )}
        </div>
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
                    <dd className="border border-blue-800 me-2 mt-1.5 inline-flex items-center rounded bg-white px-2.5 py-0.5 text-xs font-medium text-blue-800 w-[105px]">
                        <FontAwesomeIcon icon={faHourglassHalf} color={'blue'} className='mr-1 w-[15px]' />
                        Chuẩn bị
                    </dd>
                );
            case 3:
                return (
                    <dd className="border border-orange-800 me-2 mt-1.5 inline-flex items-center rounded bg-white px-2.5 py-0.5 text-xs font-medium text-yellow-800 w-[105px]">
                        <FontAwesomeIcon icon={faTruckFast} color={'#C0B907'} className='mr-1 w-[15px]' />
                        Vận chuyển
                    </dd>
                );
            case 4:
                return (
                    <dd className="border border-green-800 me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium bg-white text-green-800 w-[105px]">
                        <FontAwesomeIcon icon={faCheck} color={'green'} className='mr-1 w-[15px]' />
                        Hoàn thành
                    </dd>
                );
            case 5:
                return (
                    <dd className="border border-violet-800 me-2 mt-1.5 inline-flex items-center rounded bg-white px-2.5 py-0.5 text-xs font-medium text-violet-800 w-[105px]">
                        <FontAwesomeIcon icon={faRotateLeft} color={'#5907C0'} className='mr-1 w-[15px]' />
                        Trả hàng
                    </dd>
                );
            case 6:
                return (
                    <dd className="border border-red-800 me-2 mt-1.5 inline-flex items-center rounded bg-white px-2.5 py-0.5 text-xs font-medium text-red-800 w-[105px]">
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
export { Label, Input, LabelError, Component, Paginate, Button, StatusOrder, Label2, Component2, Component3 };