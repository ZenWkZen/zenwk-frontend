import { useContext, Context } from "react";
import { RegisterFlowContext } from "../context/RegisterFlowContext";

/**
 * Exporta el contexto para RegisterFlowContext.
 * @returns RegisterFlowContext
 */
export const useRegisterFlowContext = () => {
    return useSafeConext(RegisterFlowContext, "RegisterFlowContext");
};

/**
 * Valida cualquier contexto que pueda ser undefined.
 * @param context - Contexto a usar
 * @param contextName - Nombre del contexto
 */
export const useSafeConext = <T>(
    context: Context<T | undefined>,
    contextName: string
) => {
    const result = useContext(context);
    if (result === undefined) {
        throw new Error(
            `useSafeConext: ${contextName} debe usarse correctamente dentro de su Provider.`
        );
    }

    return result;
};
