interface Props {
    text: React.ReactNode;
    isCenter?: boolean;
}

/**
 * @abstract Componente general para los encabezado a nivel de texto.
 * @param title
 * @returns
 */
const HeaderText = ({ text, isCenter = true }: Props) => {
    return (
        <h3
            className={`my-5 text-xl font-medium text-gray-500 ${isCenter && "text-center"}`}
        >
            {text}
        </h3>
    );
};

export default HeaderText;
