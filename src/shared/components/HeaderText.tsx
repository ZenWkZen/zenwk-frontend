interface Props {
    /** Texto o elemento React que se mostrará como encabezado */
    text: React.ReactNode;
    /** Indica si el texto debe centrarse. Por defecto: true */
    isCenter?: boolean;
}

/**
 * Componente HeaderText
 *
 * Muestra un encabezado de texto con estilos aplicados. Permite alinear el texto al centro u otro según la prop `isCenter`.
 *
 * @param text - Texto o contenido React a mostrar.
 * @param isCenter - Si se alinea el texto al centro o no (true por defecto).
 * @returns JSX.Element
 */
const HeaderText = ({ text, isCenter = true }: Props) => {
    return (
        <h3
            className={`my-5 px-10 text-xl font-medium text-gray-500 ${
                isCenter && "text-center"
            }`}
        >
            {text}
        </h3>
    );
};

export default HeaderText;
