import { PersonContext } from "@user/context/PersonContext";
import { useSafeConext } from "@app/shared/utils/useContextUtils";

/**
 * Exporta el contexto  del el ancho del sidebar para
 * poder aplicar cambios dinámicos en los etilos css.
 * @returns RegisterFlowContext
 */
export const UsePersonContext = () => {
    return useSafeConext(PersonContext, "PersonContext");
};
