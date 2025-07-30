import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";

// Define la interfaz de props esperadas por el componente ButtonOpen
interface Props {
    href: string;
    text: string;
}

/**
 * Componente que renderiza un botón con estilo que abre un enlace en una nueva pestaña.
 * Incluye un ícono de "abrir en nueva ventana" junto al texto.
 *
 * @param href URL del enlace externo que se abrirá
 * @param text Texto descriptivo que se mostrará en el botón
 */
const ButtonOpen = ({ href, text }: Props) => {
    return (
        <Link
            href={href}
            target="_blank" // Abre el enlace en una nueva pestaña
            rel="noopener noreferrer" // Mejora seguridad y rendimiento al abrir una nueva pestaña
            className="inline-flex items-center gap-1 rounded-lg border-[0.1rem] border-gray-600 px-2 py-1 text-sm hover:border-[#2E887B] hover:text-[#2E887B] sm:text-xs"
        >
            {/* Texto del botón */}
            {text}

            {/* Ícono que indica que el enlace se abre en una nueva pestaña */}
            <OpenInNewIcon className="!text-[0.9rem]" />
        </Link>
    );
};

export default ButtonOpen;
