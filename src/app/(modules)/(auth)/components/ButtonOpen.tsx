import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";

interface Props {
    href: string;
    text: string;
}

const ButtonOpen = ({ href, text }: Props) => {
    return (
        <>
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border-[0.1rem] border-gray-600 px-2 py-1 text-[0.8rem] hover:border-[0.1rem] hover:border-[#2E887B] hover:text-[#2E887B]"
            >
                {text}
                <OpenInNewIcon className="!text-[0.9rem]" />
            </Link>
        </>
    );
};

export default ButtonOpen;
