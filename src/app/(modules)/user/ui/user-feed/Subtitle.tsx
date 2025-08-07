import React from "react";

const Subtitle = ({ text }: { text: React.ReactNode }) => {
    // max-w-lg
    return (
        <>
            <label className="text-[0.76rem] text-gray-500 sm:text-[0.8rem] md:text-[0.84rem] lg:text-[0.88rem] xl:text-[0.92rem] dark:text-white">
                {text}
            </label>
        </>
    );
};

export default Subtitle;
