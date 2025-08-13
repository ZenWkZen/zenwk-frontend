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
            <div className="group relative mb-[0.3rem] flex items-end gap-[0.1rem] drop-shadow-md select-none">
                <LotusIcon className="block h-8 w-8" />
                <div className="translate-y-[6.5px] dark:text-white">
                    <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between">
                        <Title
                            sizeOffset={20}
                            text={
                                <div
                                    className={`${isToolTip && "cursor-pointer"}`}
                                >
                                    <span
                                        className={`${TEXT_VIOLET_REDDISH} font-[300] tracking-[0.15rem]`}
                                        style={{
                                            filter: "drop-shadow(0px 2px 1px rgba(196,112,160,0.5))",
                                        }}
                                    >
                                        {UserMessages.header.logo.zUpperCase}
                                    </span>
                                    <span
                                        className={`${TEXT_CYAN_CUSTOM} font-[350] tracking-wide`}
                                        style={{
                                            filter: "drop-shadow(0px 2px 1px rgba(86,108,123,0.3))",
                                        }}
                                    >
                                        {UserMessages.header.logo.enwk}
                                    </span>
                                </div>
                            }
                        />
                    </div>
                    {isToolTip && (
                        <Tooltip position="bottom">
                            {UserMessages.messageToolTip.start}
                        </Tooltip>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default LogoZenwk;
