import { useRouter } from "next/navigation";
import { useEffect, Dispatch, SetStateAction } from "react";

import { fetchValidateTokenApi } from "@app/helpers/fecth-api";

/**
 * Verifica la validez del token, UUID y correo electrónico proporcionados.
 * Si alguno no coincide, redirige al usuario al flujo de registro.
 *
 * @param email - Correo electrónico del usuario.
 * @param uuid - Identificador UUID asociado al token.
 * @param setLoading - Función para activar o desactivar el indicador de carga.
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
             * Función para validar el flujo del registro.
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
