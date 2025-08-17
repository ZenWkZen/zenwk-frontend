import {
    BG_CYAN,
    BG_CYAN_HOVER,
    TEXT_BLUE_COLOR,
} from "@app/styles/constans-color";
import { X } from "lucide-react";

import Tooltip from "@app/shared/ui/Tooltip";

const ButtonCloseWindow = ({
    text,
    watch = false,
    align = "left-0",
    position = "top",
}: {
    text: string;
    watch?: boolean;
    align?: string;
    position?: "top" | "bottom" | "left" | "right";
}) => {
    return (
        <>
            {watch && (
                <div className="group relative">
                    <button
                        className={`absolute ${align} cursor-pointer ${TEXT_BLUE_COLOR}`}
                    >
                        <div>
                            <X size={17} />
                        </div>
                        <Tooltip position={position}>{text}</Tooltip>
                    </button>
                </div>
            )}
        </>
    );
};

export default ButtonCloseWindow;
