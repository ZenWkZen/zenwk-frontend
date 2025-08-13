const Tooltip = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {/** tooltip */}
            <div className="absolute -top-8 left-1/2 z-10 flex -translate-x-1/2 scale-0 flex-col items-center transition-transform group-hover:scale-100 group-hover:opacity-45">
                <div className="rounded bg-black px-3 py-1.5 text-xs whitespace-nowrap text-white">
                    {children}
                </div>
                <div className="mt-[-4px] h-2 w-2 rotate-45 bg-black"></div>
            </div>
        </>
    );
};

export default Tooltip;
