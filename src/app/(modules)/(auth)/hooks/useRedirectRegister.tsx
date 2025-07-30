import { useRouter } from "next/navigation";
import { useEffect, Dispatch, SetStateAction } from "react";

import {
    fetchValidateTokenApi,
    fetchTokenApi,
} from "<app>/app/helpers/fecth-api";

/**
 *  Redirige al registro si el código UUID, token y email no coinciden.
 * @param email - Email del usuario
 * @param uuid  - Código UUID al generar el token
 * @param setLoading  - Cargador
 */
const useRedirectRegister = (
    email: string,
    uuid: string,
    setLoading: Dispatch<SetStateAction<boolean>>
) => {
    const router = useRouter();
    /**
     * useEffect del componente.
     */
    useEffect(() => {
        const validateToken = async () => {
            /**
             * Funcion para validar el flujo del registro
             */
            try {
                if (email && uuid) {
                    const res = await fetchValidateTokenApi("", email, uuid);
                    if (!res) {
                        throw "";
                    }
                } else {
                    throw "";
                }
            } catch (error) {
                router.push("/register");
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []);
};

export default useRedirectRegister;
