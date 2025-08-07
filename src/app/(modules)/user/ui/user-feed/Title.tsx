import React from "react";

const Title = ({ text }: { text: React.ReactNode }) => {
    // max-w-lg
    return (
        <>
            <label className="text-[0.83rem] leading-normal text-gray-900 sm:text-[0.88rem] md:text-[0.92rem] lg:text-[0.96rem] xl:text-[1rem] dark:text-white">
                {text}
            </label>
        </>
    );
};

export default Title;
