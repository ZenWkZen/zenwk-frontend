const Paragraph = ({ text }: { text: React.ReactNode }) => {
    return (
        <>
            <div className="font-sm text- dark:text-gray-520 mb-2 block text-sm text-gray-500 sm:w-[400px]">
                {text}
            </div>
        </>
    );
};

export default Paragraph;
