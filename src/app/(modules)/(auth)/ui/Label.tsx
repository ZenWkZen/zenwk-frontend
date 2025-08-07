/**
 * Componente Label
 *
 * Muestra una etiqueta de texto asociada a un campo de formulario.
 *
 * @param text - Contenido del texto a mostrar dentro de la etiqueta. Puede ser texto plano o un nodo React.
 * @returns JSX.Element
 */
const Label = ({ text }: { text: React.ReactNode }) => {
    return (
        <label className="mb-2 block font-light text-gray-700 sm:w-[400px] dark:text-gray-600">
            {text}
        </label>
    );
};

export default Label;
