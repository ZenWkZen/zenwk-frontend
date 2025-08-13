import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import React, { useState } from "react";

interface Props {
    error?: React.ReactNode;
}

/**
 * Comonente que despliega el error a nivel de campos.
 * @param param0
 * @returns
 */
const FormError = ({ error }: Props) => {
    return (
        <>
            <div className="mt-1 mb-2 w-full text-sm text-red-600 sm:w-[400px] dark:text-red-500">
                <span className="font-stretch-normal">{error}</span>
            </div>
        </>
    );
};

export default FormError;
