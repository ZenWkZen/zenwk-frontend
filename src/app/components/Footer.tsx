import clsx from "clsx";
import SubTitle from "../(modules)/(auth)/components/SubTitle";

interface Props {
    content?: React.ReactNode;
    bgColor?: string;
}

const Footer = ({ content, bgColor }: Props) => {
    const styleFooter = clsx(
        "flex items-center justify-center px-6 py-4",
        bgColor
    );

    return (
        <>
            <footer className={styleFooter}>{content}</footer>
        </>
    );
};

export default Footer;
