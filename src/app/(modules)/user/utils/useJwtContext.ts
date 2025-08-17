import { JwtContext } from "@user/context/JwtContext";
import { useSafeConext } from "@app/shared/utils/useContextUtils";

/**
 * Exporta el contexto para RegisterFlowContext.
 * @returns RegisterFlowContext
 */
export const useJwtContext = () => {
    return useSafeConext(JwtContext, "JwtContext");
};
