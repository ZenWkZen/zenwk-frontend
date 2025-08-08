import React from "react";
import Link from "next/link";
import Title from "@user/ui/user-feed/Title";
import Subtitle from "@user/ui/user-feed/Subtitle";
import Text from "@user/ui/user-feed/Text";

const Footer = () => {
    return (
        <footer className="m-4 rounded-lg bg-white shadow-sm dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Title
                        text={
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#758E9F] dark:text-white">
                                ZenWK
                            </span>
                        }
                    />

                    <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Text
                                text={
                                    <Link
                                        href="#"
                                        className="me-4 hover:underline md:me-6"
                                    >
                                        Acerca de nosotros
                                    </Link>
                                }
                            />
                        </li>
                        <li>
                            <Text
                                text={
                                    <Link
                                        href="#"
                                        className="me-4 hover:underline md:me-6"
                                    >
                                        Política de privacidad
                                    </Link>
                                }
                            />
                        </li>
                        <li>
                            <Text
                                text={
                                    <Link
                                        href="#"
                                        className="me-4 hover:underline md:me-6"
                                    >
                                        Términos y licencia
                                    </Link>
                                }
                            />
                        </li>
                        <li>
                            <Text
                                text={
                                    <Link
                                        href="#"
                                        className="me-4 hover:underline md:me-6"
                                    >
                                        Contáctanos
                                    </Link>
                                }
                            />
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
                <Subtitle
                    text={
                        <div className="block text-center text-gray-900">
                            {" "}
                            © 2025{" "}
                            <Link href="" className="hover:underline">
                                Alineumsoft™. Innovando el futuro
                            </Link>
                            . Todos los derechos reservados.
                        </div>
                    }
                />
            </div>
        </footer>
    );
};

export default Footer;
