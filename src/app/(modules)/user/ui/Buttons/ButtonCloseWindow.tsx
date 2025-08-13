import { BG_CYAN, BG_CYAN_HOVER } from "@app/styles/constans-color";
import { X } from "lucide-react";

import Tooltip from "@app/shared/ui/Tooltip";

const ButtonCloseWindow = ({
    text,
    watch = false,
}: {
    text: string;
    watch?: boolean;
}) => {
    return (
        <>
            {watch && (
                <div className="group relative">
                    <button className="absolute left-0 cursor-pointer text-transparent hover:text-white">
                        <div
                            className={`rounded-full ${BG_CYAN} p-[0.08rem] ${BG_CYAN_HOVER}`}
                        >
                            <X size={13} />
                        </div>
                        <Tooltip>{text}</Tooltip>
                    </button>
                </div>
            )}
        </>
    );
};

export default ButtonCloseWindow;
