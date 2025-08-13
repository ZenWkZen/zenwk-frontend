"use client";
import { ChevronDown, User } from "lucide-react";
import { TEXT_CYAN_COLOR } from "@app/styles/constans-color";
import { useFetchAuthenticatedUser } from "@user/hooks/useFetchAuthenticatedUser";
import { useRef, MutableRefObject, Ref } from "react";

import Link from "next/link";
import FlyoutMenu from "@user/components/FlyoutMenu";
import UserMenu from "@user/components/UserMenu";
import UserProfilePhoto from "@user/components/UserProfilePhoto";

const userMenuItems = [
    { label: "Dashboard", href: "#" },
    { label: "Settings", href: "#" },
    { label: "Earnings", href: "#" },
    { label: "Sign out", href: "#" },
];

/**
 * Se deshabilitan opciones de navbar.
 */
const navLinks: any[] = [
    /*{ label: "Home", href: "#", active: true },
    { label: "About", href: "#" },
    { label: "Services", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Contact", href: "#" },
*/
];

/**
 * Menú del header para usuario autenticado.
 * @param param0
 * @returns
 */
const HeaderMenu = ({ isPhoto = false }: { isPhoto?: boolean }) => {
    const avatarBtnRef = useRef<HTMLButtonElement>(null);
    /**
     * Pasa el evento programaticamente.
     */
    const handleChevronClick = () => {
        avatarBtnRef.current?.focus();
    };

    /**
     * La función mergeRefs combina múltiples referencias (refs) de React en una sola. Esto permite
     * asignar un mismo elemento DOM o componente a varias referencias, sean funciones o referencias
     * creadas con useRef. Itera sobre cada referencia, validando si existe, y actualiza su valor
     * actual (current) o ejecuta la función correspondiente. Es útil cuando un componente necesita
     * exponer su referencia a varios consumidores, como integraciones con bibliotecas externas
     * y lógica interna.
     * @param refs
     * @returns
     */
    const mergeRefs = <T,>(...refs: (Ref<T> | undefined)[]) => {
        return (element: T) => {
            refs.forEach((ref) => {
                if (!ref) return;
                if (typeof ref === "function") {
                    ref(element);
                } else {
                    (ref as MutableRefObject<T | null>).current = element;
                }
            });
        };
    };

    /**
     *  Use efect para recuperar el useJwtContext y consultar el usuario.
     **/
    const { userDTO, loading } = useFetchAuthenticatedUser();
    /**

    /**
     * Cargar la foto el usuario o un ícono por defecto si el usuario no ha cargado una imagen. 
     * @returns
     */
    const isPhotoProfile = (isOpenMenu?: boolean) => {
        return (
            <UserProfilePhoto
                isOpenMenu={isOpenMenu ?? false}
                isPhoto={isPhoto}
            />
        );
    };

    return (
        <nav className="border-b border-b-gray-300 bg-white shadow-[0_4px_5px_-4px_rgba(0,0,0,0.10)] dark:bg-gray-900">
            <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between p-3">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        ZenWK
                    </span>
                </Link>

                {/* User menu & mobile toggle */}
                <div className="flex items-center space-x-3 md:order-2 md:space-x-1 rtl:space-x-reverse">
                    {/* Menú flotante disparado por el button profile de usuario */}
                    <FlyoutMenu
                        trigger={({ onClick, ref }) => (
                            <div className="flex space-x-0.5">
                                <button
                                    type="button"
                                    tabIndex={0}
                                    ref={mergeRefs(ref, avatarBtnRef)}
                                    className="flex cursor-pointer rounded-full bg-gradient-to-r hover:ring-2 hover:ring-gray-300 focus:ring-4 focus:ring-gray-300 focus:transition-shadow focus:duration-500"
                                    onClick={onClick}
                                >
                                    {isPhotoProfile()}
                                </button>
                                <button
                                    className={`${TEXT_CYAN_COLOR} cursor-pointer transition-transform duration-300 hover:scale-130`}
                                    onClick={() => {
                                        handleChevronClick();
                                        onClick();
                                    }}
                                >
                                    <ChevronDown size={15} strokeWidth={1.4} />
                                </button>
                            </div>
                        )}
                        position="right"
                    >
                        <UserMenu
                            isPhoto={isPhoto}
                            userEmail={userDTO?.email}
                        />
                    </FlyoutMenu>

                    {/* Dropdown */}
                    {/* Mobile menu button */}
                </div>

                {/* Desktop navigation */}
                <div
                    className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
                    id="navbar-user"
                >
                    <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
                        {navLinks.length > 0 &&
                            navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className={`block rounded-sm px-3 py-2 ${
                                            link.active
                                                ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                                : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                                        }`}
                                        aria-current={
                                            link.active ? "page" : undefined
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HeaderMenu;
