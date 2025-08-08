import React from "react";

const Subtitle = ({
    text,
    isError,
}: {
    text: React.ReactNode;
    isError?: boolean;
}) => {
    return (
        <div className="mt-2 mb-3">
            <label
                className={`text-[0.76rem] ${isError ? "font-medium text-[#E77B73]" : "text-gray-500"} sm:text-[0.8rem] md:text-[0.84rem] lg:text-[0.88rem] xl:text-[0.92rem] dark:text-white`}
            >
                {text}
            </label>
        </div>
    );
};

export default Subtitle;
