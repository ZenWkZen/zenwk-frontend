import React from "react";
import {
    ERROR_COLOR,
    BASE_TEXT_COLOR,
    BORDER_COLOR,
} from "@app/styles/constans-color";
import Subtitle from "@user/ui/user-feed/Subtitle";

interface Props {
    placeholder: string;
    isError?: boolean;
    label?: string;
}

const InputText = ({ placeholder, isError, label }: Props) => {
    const borderColor = isError ? ERROR_COLOR : BORDER_COLOR;
    const textColor = isError ? ERROR_COLOR : BASE_TEXT_COLOR;

    return (
        <div>
            <input
                style={{
                    color: textColor,
                    borderColor: borderColor,
                }}
                type="text"
                className={`block w-full rounded-lg border-[1px] border-gray-300 bg-white px-2 py-[0.33rem] text-center text-xs text-gray-500 ${isError ? "placeholder:text-[#E77B73]" : "placeholder:text-gray-500"} focus:border focus:border-gray-400 focus:ring-0 focus:outline-none`}
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default InputText;
