const Text = ({ text }: { text: React.ReactNode }) => {
    return (
        <>
            <label className="text-[0.72rem] text-gray-500 sm:text-[0.76rem] md:text-[0.8rem] lg:text-[0.84rem] xl:text-[0.88rem] dark:text-white">
                {text}
            </label>
        </>
    );
};

export default Text;
