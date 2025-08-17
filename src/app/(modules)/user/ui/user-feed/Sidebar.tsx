"use client";

import { useEffect, useRef, useState } from "react";
import {
    TEXT_VIOLET_REDDISH_BOLD_HOVER,
    TEXT_CYAN_COLOR,
    TEXT_VIOLET_REDDISH_BOLD,
} from "@app/styles/constans-color";
import { UserMessages } from "@user/constants/user-messages";
import { useSidebarContext } from "@user/utils/UseWidthSidebarContext";

import Text from "@user/ui/user-feed/Text";
import SidebarIcon from "@user/components/icons/SidebarIcon";
import CloseSidebarIcon from "@user/components/icons/CloseSidebarIcon";
import Tooltip from "@app/shared/ui/Tooltip";
import CalendarCheckIcon from "@user/components/icons/CalendarCheckIcon";
import AlarmClockIcon from "@user/components/icons/AlarmClockIcon";
import FolderRootIcon from "@user/components/icons/FolderRoot";
import CurveIcon from "@user/components/icons/CurveIcon";
import Link from "next/link";
import ChevronRightIcon from "@user/components/icons/ChevronRightIcon";
import BrainIcon from "@user/components/icons/BrainIcon"; // nuevo icono IA (debes tenerlo o crearlo)

/**
 * Secciones del sidebar con acciones IA.
 **/
export const sections = [
    {
        title: UserMessages.sidebar.options.myTime,
        icon: <AlarmClockIcon sizeStroke={1.1} size={20} className="" />,
        links: [
            { href: "/", label: "Iniciar registro" },
            { href: "/", label: "Iniciar registro 2" },
        ],
        aiAction: "Analizar y optimizar mi tiempo",
    },
    {
        title: UserMessages.sidebar.options.tasks,
        icon: <CalendarCheckIcon sizeStroke={1.1} size={20} className="" />,
        links: [],
        aiAction: "Priorizar mis tareas con IA",
    },
    {
        title: UserMessages.sidebar.options.proyects,
        icon: <FolderRootIcon sizeStroke={1.1} size={20} className="" />,
        links: [],
        aiAction: "Detectar riesgos del proyecto",
    },
    {
        title: UserMessages.sidebar.options.reports,
        icon: <CurveIcon sizeStroke={1.1} size={20} className="" />,
        links: [
            { href: "/", label: "Iniciar registro" },
            { href: "/", label: "Iniciar registro 2" },
        ],
        aiAction: "Generar análisis inteligente",
    },
];

const Sidebar = () => {
    const sidebarRef = useRef(null);
    // Contexto del width sidebar
    const { setSidebarWidth } = useSidebarContext();
    const [width, setWidth] = useState(0);

    // useEffect para obtener el ancho dinámico del sidebar.
    useEffect(() => {
        if (sidebarRef.current) {
            // Observamos los cambios de tamaño
            const observer = new ResizeObserver((values) => {
                for (let value of values) {
                    setWidth(value.contentRect.width);
                }
            });

            observer.observe(sidebarRef.current);
            return () => observer.disconnect();
        }
    }, []);

    // Propaga la medida de ancho.
    useEffect(() => {
        setSidebarWidth(width);
    }, [width, setSidebarWidth]);

    const [hiddenSidebar, setHiddenSidebar] = useState(true);
    const [openSections, setOpenSections] = useState<number[]>([]);

    const onClickHandler = () => setHiddenSidebar((prev) => !prev);

    const toggleSection = (idx: number) => {
        setOpenSections((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        );
    };

    const handleAIAction = (action: string) => {
        console.log("Ejecutar IA:", action);
        // Aquí podrías abrir un modal o llamar a tu backend IA
    };

    return (
        <div ref={sidebarRef} className="">
            {/* Botón superior */}
            <div className="m-[0.4rem] mx-4 h-fit w-full max-w-[50px] cursor-pointer rounded-lg bg-white shadow-[0_10px_14px_rgba(0,0,0,0.18)] select-none">
                {hiddenSidebar ? (
                    <div className="flex h-10 items-center justify-center px-4">
                        <div
                            className="group relative"
                            onClick={onClickHandler}
                        >
                            <CloseSidebarIcon sizeStroke={1.1} size={25} />
                            <Tooltip position="right" hiddenArrow>
                                Ocultar sidebar
                            </Tooltip>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-10 items-center justify-center rounded-t-lg rounded-b-lg px-4 py-1">
                        <div
                            className="group relative"
                            onClick={onClickHandler}
                        >
                            <SidebarIcon sizeStroke={0.2} size={25} />
                            <Tooltip position="right" hiddenArrow>
                                Abrir sidebar
                            </Tooltip>
                        </div>
                    </div>
                )}
            </div>

            {/* Contenido con animación */}
            <div
                className={`mx-4 h-fit origin-top-left transform-gpu rounded-lg border-0 border-gray-300 bg-white shadow-[0_10px_14px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-in-out select-none ${
                    hiddenSidebar
                        ? "scale-100 opacity-100"
                        : "scale-0 overflow-hidden opacity-0"
                }`}
            >
                {hiddenSidebar &&
                    sections.map((section, idx) => {
                        const isOpen = openSections.includes(idx);

                        return (
                            <div key={idx}>
                                {/* Título */}
                                <Text
                                    sizeOffset={-1}
                                    text={
                                        <div
                                            onClick={() => toggleSection(idx)}
                                            className={`group relative flex cursor-pointer items-center px-4 py-3 hover:bg-gray-50 ${
                                                isOpen && "bg-gray-50"
                                            } ${idx == 0 ? "hover: rounded-t-lg" : idx === sections.length - 1 && !isOpen && "hover: rounded-b-lg"}`}
                                        >
                                            <div
                                                className={`mr-2 flex items-center gap-2 font-[340] tracking-tighter ${
                                                    isOpen
                                                        ? TEXT_VIOLET_REDDISH_BOLD
                                                        : TEXT_CYAN_COLOR
                                                } ${TEXT_VIOLET_REDDISH_BOLD_HOVER}`}
                                            >
                                                {section.icon}
                                                {section.title}
                                            </div>

                                            {section.links.length > 0 && (
                                                <ChevronRightIcon
                                                    className={`ml-auto transition-transform duration-200 ${
                                                        isOpen
                                                            ? "rotate-90 " +
                                                              TEXT_VIOLET_REDDISH_BOLD
                                                            : TEXT_CYAN_COLOR
                                                    }`}
                                                    size={18}
                                                    sizeStroke={1.3}
                                                />
                                            )}

                                            <Tooltip position="right">
                                                Opciones
                                            </Tooltip>
                                        </div>
                                    }
                                />

                                {/* Links */}
                                {section.links.length > 0 && (
                                    <ul
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? "max-h-40 opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        {section.links.map((link, i) => (
                                            <li key={i} className="w-full">
                                                {/* Aplicar si se quita botón de I.A ${idx === sections.length - 1 && i === section.links.length - 1 && "hover:rounded-b-lg"} */}
                                                <Link
                                                    href={link.href}
                                                    className="block w-full px-4 py-2 text-xs text-gray-600 transition-colors hover:bg-gray-100"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Botón IA */}
                                {isOpen && section.aiAction && (
                                    <button
                                        onClick={() =>
                                            handleAIAction(section.aiAction)
                                        }
                                        className={` ${
                                            idx === sections.length - 1 &&
                                            "hover: rounded-b-lg"
                                        } flex w-full items-center gap-2 px-4 py-2 text-xs text-violet-700 transition-colors hover:bg-violet-50`}
                                    >
                                        <BrainIcon sizeStroke={1.2} size={18} />
                                        {section.aiAction}
                                    </button>
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Sidebar;
