import React from "react";
import Subtitle from "@user/ui/user-feed/Subtitle";
import Text from "@user/ui/user-feed/Text";

interface Props {
    text: string;
}

//  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
const Button = ({ text }: Props) => {
    return (
        <button
            type="button"
            className="w-full max-w-[700px] rounded-lg bg-[#758E9F] px-3 py-[0.45rem] align-middle font-light opacity-100 hover:bg-[#566C7B] focus:ring-0 focus:outline-none"
        >
            <Text text={<p className="text-center text-white">{text}</p>} />
        </button>
    );
};

export default Button;
