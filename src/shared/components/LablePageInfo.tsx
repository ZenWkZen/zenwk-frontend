import React from "react";

/**
 * Componente para el label de las paginas completamente informativas.
 * @param title
 * @returns
 */
const LablePageInfo = ({ text }: { text: React.ReactNode }) => {
    return (
        <h3 className="my-5 px-4 text-justify font-light text-gray-500 sm:text-sm md:text-[1.2rem]">
            {text}
        </h3>
    );
};

export default LablePageInfo;
