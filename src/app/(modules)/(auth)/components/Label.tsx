const Label = ({ text }: { text: string }) => {
    return (
        <>
            <label className="mb-2 block text-sm font-medium text-gray-500 sm:w-[400px] dark:text-gray-700">
                {text}
            </label>
        </>
    );
};

export default Label;
