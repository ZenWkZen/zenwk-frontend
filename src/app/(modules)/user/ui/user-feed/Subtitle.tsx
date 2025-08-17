import React from "react";
import Text from "@user/ui/user-feed/Text";

const Subtitle = ({
    text,
    isError,
    sizeOffset,
}: {
    text: React.ReactNode;
    isError?: boolean;
    sizeOffset?: number;
}) => {
    return (
        <div className="mt-[0.6rem] mb-[0.4rem]">
            <Text
                sizeOffset={sizeOffset}
                text={text}
                className={`font-[350] ${isError ? "text-[#E77B73]" : "text-gray-500"} `}
            />
        </div>
    );
};

export default Subtitle;
