import '../index.css'
import * as React from "react"
import ReactPaginate from 'react-paginate';
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
export { Label, Input, LabelError, Component, Paginate, Button };