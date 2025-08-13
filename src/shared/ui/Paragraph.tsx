interface Props {
    text: React.ReactNode;
}

/**
 * Componente `Paragraph`
 *
 * Renderiza un bloque de texto con estilo de párrafo, usado para descripciones o contenido general.
 *
 * @param text - Contenido del párrafo.
 * @returns Elemento JSX estilizado como párrafo.
 */
const Paragraph = ({ text }: Props) => {
    return (
        <div className="mb-2 block text-sm text-gray-500 sm:w-[400px] dark:text-gray-500">
            {text}
        </div>
    );
};

export default Paragraph;
