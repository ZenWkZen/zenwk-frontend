import Link from "next/link";
import clsx from "clsx";

interface Props {
    content?: React.ReactNode;
    bgColor?: string;
}

const Header = ({ content, bgColor }: Props) => {
    const styleHeader = clsx(
        "mb-10 flex h-14 w-full items-center justify-between px-14 text-white",
        bgColor
    );

    return (
        <>
            <div className={styleHeader}>
                <div className="text-2xl font-semibold tracking-wide text-cyan-900">
                    <Link href="/">
                        <span className="font-light">Zen</span>
                        <span className="font-bold">Wk</span>
                    </Link>
                </div>

                {content}
            </div>
        </>
    );
};

export default Header;
