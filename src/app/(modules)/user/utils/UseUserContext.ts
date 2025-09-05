import { UserContext } from "@user/context/UserContext";
import { useSafeConext } from "@app/shared/utils/useContextUtils";

/**
 * @returns RegisterFlowContext
 */
export const UseUserContext = () => {
    return useSafeConext(UserContext, "UserContext");
};
