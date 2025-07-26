interface Props {
    title: React.ReactNode;
}

/**
 * @abstract Componente general para los titulos.
 * @param title
 * @returns
 */
const Title = ({ title }: Props) => {
    return <h1 className="my-5 text-center text-3xl text-gray-700">{title}</h1>;
};

export default Title;
