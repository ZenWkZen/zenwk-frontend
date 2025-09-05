import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';
import clsx from 'clsx';

// Define la interfaz de props esperadas por el componente ButtonOpen
interface Props {
    href: string;
    text: string;
    typeStyle?: 'profileConfiguration' | 'default' | 'other'; // puedes ir agregando más
}

/**
 * Componente que renderiza un botón con estilo que abre un enlace en una nueva pestaña.
 * Incluye un ícono de "abrir en nueva ventana" junto al texto.
 *
 * @param href URL del enlace externo que se abrirá
 * @param text Texto descriptivo que se mostrará en el botón
 */
const ButtonOpen = ({ href, text, typeStyle = 'default' }: Props) => {
    // estilos base por defecto
    const baseStyle =
        ' inline-flex items-center gap-1 rounded-lg border-[0.1rem] border-gray-600 px-2 py-1 text-sm hover:border-[#2E887B] hover:text-[#2E887B] sm:text-xs';
    const profileConfiguration =
        'inline-flex items-center  text-[0.72rem] gap-1 text-[#C26B9C] rounded-md border-[0.08rem]  hover:border-[#D08BB2] border-[#C26B9C] px-2 py-1  hover:bg-[#D08BB2] hover:text-white ';

    // estilos condicionales según el tipo
    const styleClasses = clsx({
        [baseStyle]: typeStyle === 'default',
        [profileConfiguration]: typeStyle === 'profileConfiguration',
    });

    return (
        <Link
            href={href}
            target="_blank" // Abre el enlace en una nueva pestaña
            rel="noopener noreferrer" // Mejora seguridad y rendimiento al abrir una nueva pestaña
            className={styleClasses}
        >
            {/* Texto del botón */}
            {text}

            {/* Ícono que indica que el enlace se abre en una nueva pestaña */}
            <OpenInNewIcon className="!text-[0.9rem]" />
        </Link>
    );
};

export default ButtonOpen;
