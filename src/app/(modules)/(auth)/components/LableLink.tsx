/**
 * Componente para resaltar textos usando en link's.
 * @param param0
 * @returns
 */
const LableLink = ({ text }: { text: string }) => {
    return (
        <span className="mb-2 inline cursor-pointer font-bold text-[#339989] hover:underline">
            {text}
        </span>
    );
};

export default LableLink;
