import { SexOptionsContext } from "@user/context/SexOptionsContext";
import { useSafeConext } from "@app/shared/utils/useContextUtils";

/**
 * Exporta el contexto para RegisterFlowContext.
 * @returns RegisterFlowContext
 */
export const useSexOptionsContext = () => {
    return useSafeConext(SexOptionsContext, "SexOptionsContext");
};
