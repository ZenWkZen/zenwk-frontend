interface Props {
    title: React.ReactNode;
}

/**
 * Componente general para los titulos.
 * @param title - Contenido del título.
 * @returns Elemento JSX que representa un título.
 */
const Title = ({ title }: Props) => {
    return (
        <h1 className="my-5 text-center text-3xl font-light text-gray-700">
            {title}
        </h1>
    );
};

export default Title;
