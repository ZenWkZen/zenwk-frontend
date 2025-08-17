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
const Footer = ({ style }: { style?: React.CSSProperties }) => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            {/** bkp (anterior limite de la pantalla):  max-w-screen-2xl
             * pl-[165px]: valor del ancho del sidebear. Pendiente implementar context para obtener el ancho actual con y sin sidebear y centrar dinámicamente.
             */}
            <div className="grid grid-cols-2 gap-10 p-2 py-5" style={style}>
                {/** Columna 1 */}
                <div className="flex items-center justify-self-end text-sm text-gray-600">
                    <ul className="flex items-center divide-x divide-gray-300">
                        <li className="px-2">
                            <Text
                                sizeOffset={-17}
                                text={
                                    <div className="flex items-center justify-center">
                                        <LotusIcon width={10} sizeStroke={10} />
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
                                            {UserMessages.footer.policies}
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
