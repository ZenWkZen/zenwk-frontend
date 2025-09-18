import { forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AuthMessages } from '@auth/constants/auth-messages';
import { usePasswordToggle } from '@app/shared/hooks/usePasswordToggle';

import Label from './Label';
import Tooltip from '@app/shared/ui/Tooltip';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    isError?: boolean;
    children: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {
        type = 'text',
        isError = false,
        label,
        children,
        placeholder,
        onBlur,
        name,
        onChange,
    } = props;

    const {
        showPassword,
        togglePassword,
        getInputType,
        handleCut,
        handlePaste,
        handleKeyDown,
    } = usePasswordToggle(type);

    return (
        <div className="mb-3">
            <Label text={label} />
            <div className="relative h-9 w-full">
                <input
                    className={`h-full w-full rounded-lg border p-2.5 ${
                        type === 'password' && 'pr-8'
                    } placeholder:text-gray-400 sm:w-[400px] ${
                        isError
                            ? 'border-red-500 bg-red-50 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    type={getInputType()}
                    placeholder={placeholder}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    onCut={handleCut}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                        onClick={togglePassword}
                    >
                        <div className="group relative">
                            {showPassword ? (
                                <EyeOff
                                    className="text-gray-500 hover:text-gray-700"
                                    size={15}
                                />
                            ) : (
                                <Eye
                                    className="text-gray-500 hover:text-gray-700"
                                    size={15}
                                />
                            )}
                            <Tooltip>
                                {showPassword
                                    ? AuthMessages.tooltip.hidePassword
                                    : AuthMessages.tooltip.showPassword}
                            </Tooltip>
                        </div>
                    </button>
                )}
            </div>
            {children}
        </div>
    );
});

export default FormInput;
