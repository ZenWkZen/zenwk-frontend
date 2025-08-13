import React from "react";
import clsx from "clsx";
import GenerateBaseText from "../../components/GenerateBaseText";
import { base } from "framer-motion/client";

interface TitleProps {
    text: React.ReactNode;
    sizeOffset?: number; // incremento en rem
}

const Title = ({ text, sizeOffset = 0 }: TitleProps) => {
    /**
     * Tamaño base parlos titulos del sistema.
     */
    const baseSizes = {
        base: 0.86,
        sm: 0.91,
        md: 0.95,
        lg: 0.99,
        xl: 1.06,
    };

    return (
        <GenerateBaseText
            text={text}
            baseSizes={baseSizes}
            sizeOffset={sizeOffset}
        />
    );
};

export default Title;
