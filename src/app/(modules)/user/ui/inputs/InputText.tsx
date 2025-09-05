import clsx from 'clsx';
import { forwardRef } from 'react';
import {
    ERROR_COLOR,
    BASE_TEXT_COLOR,
    BORDER_COLOR,
} from '@app/styles/constans-color';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    isError?: boolean;
    children: React.ReactNode;
}

const InputText = forwardRef<HTMLInputElement, Props>(
    ({ children, placeholder, isError, ...props }, ref) => {
        const containerClass = clsx(
            'rounded-lg',
            'has-[input:focus-within]:shadow-sm',
            'has-[input:focus-within]:ring-1',
            'has-[input:focus-within]:outline-1',
            'has-[input:focus-within]:-outline-offset-1',
            isError
                ? 'has-[input:focus-within]:ring-red-200 has-[input:focus-within]:outline-[#e77b73]'
                : 'has-[input:focus-within]:ring-blue-100 has-[input:focus-within]:outline-[#9FB0BC]'
        );

        const inputClass = clsx(
            'block w-full rounded-lg border-[1px] bg-white px-2 py-[0.33rem]',
            'text-center text-xs focus:outline-none',
            isError
                ? 'text-[#E77B73] placeholder:text-[#E77B73]'
                : 'text-gray-500 placeholder:text-gray-400'
        );

        const borderColor = isError ? ERROR_COLOR : BORDER_COLOR;
        const textColor = isError ? ERROR_COLOR : BASE_TEXT_COLOR;

        return (
            <div>
                <div className={containerClass}>
                    <input
                        ref={ref}
                        {...props}
                        style={{
                            color: textColor,
                            borderColor: borderColor,
                        }}
                        type="text"
                        className={inputClass}
                        placeholder={placeholder}
                    />
                </div>
                {children}
            </div>
        );
    }
);

export default InputText;
