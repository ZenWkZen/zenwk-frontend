import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface Props {
    text: string;
}

const InputDisabled = ({ text }: Props) => {
    console.log(text);
    return (
        <span className="mt-3 mb-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border-0 bg-gray-200 p-2.5 text-[#2E887B] sm:w-[400px]">
            <AccountCircleIcon className="!text-[2rem] text-gray-600" />
            {text}
        </span>
    );
};

export default InputDisabled;
