import React from "react";

interface Props {
    placeholder: string;
}

const InputText = ({ placeholder }: Props) => {
    return (
        <div>
            {/**dark:border-gray-600 dark:bg-gray-700 dark:text-white
            dark:placeholder-gray-400 dark:focus:border-blue-500
            dark:focus:ring-blue-500 */}

            <input
                type="text"
                className="block w-full rounded-lg border-[1px] border-gray-300 bg-white px-2 py-[0.33rem] text-center text-xs text-gray-500 placeholder:text-gray-500 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none"
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default InputText;
