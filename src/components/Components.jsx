import '../index.css'
import * as React from "react"

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

export { Label, Input, LabelError, Component};