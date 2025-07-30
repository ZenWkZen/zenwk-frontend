"use client";

import {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

// Tipo del contexto
interface RegisterFlowContextType {
    isValidRegisterFlow: boolean;
    setValidRegisterFlow: Dispatch<SetStateAction<boolean>>;
}

// Registro del contexto
export const RegisterFlowContext = createContext<
    RegisterFlowContextType | undefined
>(undefined);

/**
 *  Crea el contexto para la sección del registro
 * @param children
 * @returns
 */
const RegisterFlowProvider = ({ children }: { children: ReactNode }) => {
    const [isValidRegisterFlow, setValidRegisterFlow] = useState(false);

    return (
        <RegisterFlowContext.Provider
            value={{ isValidRegisterFlow, setValidRegisterFlow }}
        >
            {children}
        </RegisterFlowContext.Provider>
    );
};

export default RegisterFlowProvider;
