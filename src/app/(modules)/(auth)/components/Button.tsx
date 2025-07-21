interface Props {
  text: string;
  type: any;
}

const Button = ({ text, type }: Props) => (
  <div className="mb-6">
    <button
      type={type}
      //className="w-full md:w-[400px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      className="h-9 w-full md:w-[400px] align-middle text-white bg-[#3BB79F] hover:bg-[#32A18C] focus:ring-4 focus:ring-[#6ADBC5] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#339989] dark:hover:bg-[#2E887B] focus:outline-none dark:focus:ring-[#5CC6B2]"
    >
      {text}
    </button>
  </div>
);

export default Button;
