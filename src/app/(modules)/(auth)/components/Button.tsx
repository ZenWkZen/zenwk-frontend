interface Props {
    text: string;
    type: any;
}

const Button = ({ text, type }: Props) => (
    <div className="mt-7 mb-3">
        <button
            type={type}
            //className="w-full md:w-[400px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            className="mb-2 block h-9.5 w-full rounded-lg bg-[#3BB79F] px-5 text-center align-middle text-sm font-medium text-white hover:bg-[#32A18C] focus:ring-4 focus:ring-[#6ADBC5] focus:outline-none sm:w-[400px] dark:bg-[#339989] dark:hover:bg-[#2E887B] dark:focus:ring-[#5CC6B2]"
        >
            {text}
        </button>
    </div>
);

export default Button;
