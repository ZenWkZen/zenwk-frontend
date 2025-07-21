import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

interface Props {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const FormError = ({ error }: Props) => {
  const errorMessage = (error as FieldError)?.message;

  return (
    <>
      {typeof errorMessage === "string" && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-stretch-normal">{errorMessage}</span>
        </p>
      )}
    </>
  );
};

export default FormError;
