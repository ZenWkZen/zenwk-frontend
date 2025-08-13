import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchJwtBaseApi } from "@app/helpers/fetch-api";

/**
 * Hook para carga de usuario autenticado, permite que otros componentes puedan
 * reutilizarlo para recuperar al usuario y manejar el redireccionamiento.
 * @returns
 */
export function useFetchAuthenticatedUser() {
    const [userDTO, setUserDTO] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("jwt-user");
        const userLocal = userData ? JSON.parse(userData) : "";

        const fetchGetUser = async () => {
            try {
                const pathFindByIdUser = "/users/" + userLocal.userId;
                const res = await fetchJwtBaseApi(
                    pathFindByIdUser,
                    undefined,
                    userLocal.jwt,
                    undefined,
                    "GET"
                );
                setUserDTO(res);
            } catch (error) {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        if (userLocal && userLocal.jwt) {
            fetchGetUser();
        } else {
            router.push("/login");
        }
    }, []);

    return { userDTO, loading };
}
