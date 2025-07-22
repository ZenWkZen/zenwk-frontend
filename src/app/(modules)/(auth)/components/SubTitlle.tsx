interface Props {
    text: string;
}

/**
 * @abstract Componente general para los subtitulos.
 * @param title
 * @returns
 */
const SubTitle = ({ text }: Props) => {
    return (
        <h3 className="my-5 text-center text-xl font-medium text-gray-500">
            {text}
        </h3>
    );
};

export default SubTitle;
