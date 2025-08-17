import { UserMessages } from "@user/constants/user-messages";
import {
    TEXT_CYAN_CUSTOM,
    TEXT_VIOLET_REDDISH,
} from "@app/styles/constans-color";

import Title from "@user/ui/user-feed/Title";
import LotusIcon from "@user/components/icons/LotusIcon";
import Tooltip from "@app/shared/ui/Tooltip";
import Link from "next/link";

/**
 * Logo de de la aplicación (zenwk).
 * @returns
 */
const LogoZenwk = ({ isToolTip = true }: { isToolTip?: boolean }) => {
    return (
        <Link href="/">
            <div className="group relative drop-shadow-md select-none">
                <Title
                    sizeOffset={20}
                    text={
                        <div
                            className={`flex items-center ${isToolTip && "cursor-pointer"}`}
                        >
                            <LotusIcon className="mr-[0.1rem]" width={20} />
                            <span
                                className={`${TEXT_VIOLET_REDDISH} font-[300] tracking-[0.15rem]`}
                                style={{
                                    filter: "drop-shadow(0px 2px 1px rgba(196,112,160,0))",
                                }}
                            >
                                {UserMessages.header.logo.zUpperCase}
                            </span>
                            <span
                                className={`${TEXT_CYAN_CUSTOM} font-[350] tracking-wide`}
                                style={{
                                    filter: "drop-shadow(0px 2px 1px rgba(86,108,123,0))",
                                }}
                            >
                                {UserMessages.header.logo.enwk}
                            </span>
                        </div>
                    }
                />

                {isToolTip && (
                    <Tooltip position="right" hiddenArrow={true}>
                        {UserMessages.messageToolTip.start}
                    </Tooltip>
                )}
            </div>
        </Link>
    );
};

export default LogoZenwk;
