import React from "react";
import Subtitle from "@user/ui/user-feed/Subtitle";
import Text from "@user/ui/user-feed/Text";
import { BG_CYAN, BG_CYAN_HOVER } from "@app/styles/constans-color";

interface Props {
    text: string;
}

//  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
const Button = ({ text }: Props) => {
    return (
        <button
            type="button"
            className={`mb-4 w-full max-w-[700px] rounded-lg ${BG_CYAN} px-3 py-[0.45rem] align-middle font-light opacity-100 ${BG_CYAN_HOVER} focus:ring-0 focus:outline-none`}
        >
            <Text text={<p className="text-center text-white">{text}</p>} />
        </button>
    );
};

export default Button;
