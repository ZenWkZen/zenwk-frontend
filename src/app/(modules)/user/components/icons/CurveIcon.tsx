import { TEXT_VIOLET_REDDISH_HOVER } from "@app/styles/constans-color";

const CurveIcon = ({
    className = `${TEXT_VIOLET_REDDISH_HOVER} text-[#135CDC] cursor-pointer`,
    sizeStroke = 2,
    size = 24,
}: {
    className?: string;
    sizeStroke?: number;
    size?: number;
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={sizeStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />
    </svg>
);

export default CurveIcon;
