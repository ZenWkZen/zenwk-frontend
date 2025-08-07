import { useContext, Context } from "react";
import { JwtContext } from "@user/context/JwtContext";

/**
 * Exporta el contexto para RegisterFlowContext.
 * @returns RegisterFlowContext
 */
export const useJwtContext = () => {
    return useSafeConext(JwtContext, "JwtContext");
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
