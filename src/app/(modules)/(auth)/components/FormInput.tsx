import { forwardRef } from "react";
import Label from "./Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    isError?: boolean;
    children: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {
        type = "text",
        isError = false,
        label,
        children,
        placeholder,
        onBlur,
        name,
        onChange,
    } = props;

    return (
        <div className="mb-3">
            <Label text={label} />
            <input
                className={`block h-9 w-full rounded-lg border p-2.5 placeholder:text-gray-400 sm:w-[400px] ${
                    isError
                        ? "border-red-500 bg-red-50 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
                        : "border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                }`}
                type={type}
                placeholder={placeholder}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
            />
            {children}
        </div>
    );
});

export default FormInput;
