type TooltipProps = {
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
};

const Tooltip = ({ children, position = "top" }: TooltipProps) => {
    const positionClasses: Record<typeof position, string> = {
        top: "-top-8 left-1/2 -translate-x-1/2 flex-col",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2 flex-col-reverse",
        left: "right-full mr-2 top-1/2 -translate-y-1/2 flex-row-reverse",
        right: "left-full ml-2 top-1/2 -translate-y-1/2 flex-row",
    };

    const arrowPosition: Record<typeof position, string> = {
        top: "mt-[-4px] rotate-45",
        bottom: "mb-[-4px] rotate-45",
        left: "ml-[-4px] rotate-45",
        right: "mr-[-4px] rotate-45",
    };

    return (
        <div
            className={`absolute z-10 flex scale-0 items-center transition-transform group-hover:scale-100 group-hover:opacity-45 ${positionClasses[position]}`}
        >
            <div className="rounded bg-black px-[0.45rem] py-[0.18rem] text-xs tracking-wide whitespace-nowrap text-white">
                {children}
            </div>
            <div
                className={`h-2 w-2 bg-black ${arrowPosition[position]}`}
            ></div>
        </div>
    );
};

export default Tooltip;
