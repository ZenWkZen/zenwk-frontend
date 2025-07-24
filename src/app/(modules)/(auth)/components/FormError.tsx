import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

interface Props {
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

/**
 * Comonente que despliega el error a nivel de campos.
 * @param param0
 * @returns
 */
const FormError = ({ error }: Props) => {
    let errorMessage: string | undefined;

    if (typeof error === "string") {
        errorMessage = error;
    } else {
        errorMessage = (error as FieldError)?.message;
    }

    return (
        <>
            {typeof errorMessage === "string" && (
                <div className="mt-1 mb-2 w-full text-sm text-red-600 sm:w-[400px] dark:text-red-500">
                    <span className="font-stretch-normal">{errorMessage}</span>
                </div>
            )}
        </>
    );
};

export default FormError;
