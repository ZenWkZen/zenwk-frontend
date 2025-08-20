import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchJwtBaseApi } from "@app/helpers/fetch-api";
import { LOCAL_STORAGE_JWT_ITEM } from "@app/shared/constants/common-constants";

/**
 * Hook para carga de usuario autenticado, permite que otros componentes puedan
 * reutilizarlo para recuperar al usuario y manejar el redireccionamiento.
 * @returns
 */
export function useFetchAuthenticatedUser() {
    const [userDTO, setUserDTO] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const userDataTemp = localStorage.getItem(LOCAL_STORAGE_JWT_ITEM);
        const userLocal = userDataTemp ? JSON.parse(userDataTemp) : "";
        setUserData(userLocal);

        //console.log("useFetchAuthenticatedUser - userLocal: ", userLocal);

        const fetchGetUser = async () => {
            try {
                // Api consulta usuario por id. /api/users/{idUser}
                const pathFindByIdUser = "/users/" + userLocal.userId;
                const res = await fetchJwtBaseApi(
                    pathFindByIdUser,
                    undefined,
                    userLocal.jwt,
                    undefined,
                    "GET"
                );
                // se guarda el objecto userDTO
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
            return router.push("/login");
        }
    }, []);

    return { userDTO, loading, userData };
}
