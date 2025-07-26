import clsx from "clsx";

interface Props {
    text: string;
    textColor?: string;
}

/**
 * Componente para resaltar textos usando en link's.
 * @param param0
 * @returns
 */
const LableLink = ({ text, textColor }: Props) => {
    //  text-[#339989]
    const styleSpan = clsx(
        "mb-2 inline cursor-pointer font-medium hover:underline ",
        textColor
    );
    return <span className={styleSpan}>{text}</span>;
};

export default LableLink;
