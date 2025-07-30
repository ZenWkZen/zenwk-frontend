interface Props {
    text: React.ReactNode;
}

/**
 *  Componente general para los subtitulos.
 * @param title
 * @returns
 */
const SubTitle = ({ text }: Props) => {
    return (
        <h3 className="my-5 text-center font-medium text-gray-500">{text}</h3>
    );
};

export default SubTitle;
