import {
    TEXT_VIOLET_REDDISH,
    TEXT_CYAN_CUSTOM,
    TEXT_VIOLET_REDDISH_HOVER,
    TEXT_CYAN_COLOR,
} from "@app/styles/constans-color";
import { UserMessages } from "@user/constants/user-messages";

import Link from "next/link";
import Text from "@user/ui/user-feed/Text";
import LotusIcon from "@user/components/icons/LotusIcon";

/**
 * Componente del footer para layout de usuario autenticado.
 * @returns
 */
const Footer = () => {
    return (
        <footer className="rounded-lg bg-white shadow-sm dark:bg-gray-900">
            <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-2 gap-10 p-2 py-7">
                {/** Columna 1 */}
                <div className="flex items-center justify-self-end text-sm text-gray-600">
                    <ul className="flex items-center divide-x divide-gray-300">
                        <li className="px-2">
                            <Text
                                sizeOffset={-17}
                                text={
                                    <div className="flex items-center justify-center">
                                        <LotusIcon className="h-[0.7rem] w-[0.7rem]" />
                                        <span
                                            className={`${TEXT_CYAN_CUSTOM} px-[0.1rem] font-[350]`}
                                        >
                                            <label
                                                className={`${TEXT_VIOLET_REDDISH} font-[350]`}
                                            >
                                                {
                                                    UserMessages.header.logo
                                                        .zUpperCase
                                                }
                                            </label>
                                            {UserMessages.header.logo.enwk}
                                        </span>
                                    </div>
                                }
                            />
                        </li>
                        <li className="px-2">
                            <Link href="#" className="">
                                <Text
                                    sizeOffset={-13}
                                    text={
                                        <span
                                            className={` ${TEXT_VIOLET_REDDISH_HOVER} block cursor-pointer text-center font-[350] tracking-tighter text-gray-500`}
                                        >
                                            {UserMessages.footer.polcies}
                                        </span>
                                    }
                                />
                            </Link>
                        </li>
                        <li className="px-2">
                            <Link href="#" className="">
                                <Text
                                    sizeOffset={-13}
                                    text={
                                        <span
                                            className={` ${TEXT_VIOLET_REDDISH_HOVER} block cursor-pointer text-center font-[350] tracking-tighter text-gray-500`}
                                        >
                                            {UserMessages.footer.conditions}
                                        </span>
                                    }
                                />
                            </Link>
                        </li>
                    </ul>
                </div>

                {/** Columna 2 */}
                <div className="flex items-center justify-self-start text-sm text-gray-600">
                    <ul className="flex items-center divide-x divide-gray-300">
                        <li className="px-2">
                            <Text
                                sizeOffset={-17}
                                text={
                                    <span
                                        className={`${TEXT_CYAN_COLOR} font-[350] tracking-tighter`}
                                    >
                                        {UserMessages.footer.copyrigth}
                                    </span>
                                }
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
