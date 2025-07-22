import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

interface Props {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const FormError = ({ error }: Props) => {
    const errorMessage = (error as FieldError)?.message;

    return (
        <>
            {typeof errorMessage === "string" && (
                <p className="mt-1 h-9 w-[90%] text-sm text-red-600 sm:w-[400px] dark:text-red-500">
                    <span className="font-stretch-normal">{errorMessage}</span>
                </p>
            )}
        </>
    );
};

export default FormError;
