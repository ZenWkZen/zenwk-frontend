const Label = ({ text }: { text: string }) => {
  return (
    <>
      <label
        className="block mb-2 text-sm font-medium  dark:ttext-gray-700 
          text-gray-500"
      >
        {text}
      </label>
    </>
  );
};

export default Label;
