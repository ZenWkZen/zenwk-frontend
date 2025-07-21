import { forwardRef } from "react";
import Label from "./Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isError?: boolean;
  children: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    type = "text",
    isError = false,
    label,
    children,
    placeholder,
    onBlur,
    name,
    onChange,
  } = props;

  return (
    <div className="mb-6">
      <Label text={label} />
      <input
        className={`h-9 w-full md:w-[400px]  placeholder:text-gray-400 ${
          isError
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "text-gray-900 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }`}
        type={type}
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
      {children}
    </div>
  );
});

export default FormInput;
