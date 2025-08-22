import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_JWT_ITEM } from "@app/shared/constants/common-constants";
import { fetchGetUser } from "@auth/utils/authUtils";

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
        const loadUser = async () => {
            try {
                if (userLocal && userLocal.jwt) {
                    const user = await fetchGetUser(userLocal);
                    setUserDTO(user);
                } else {
                    router.push("/login");
                }
            } catch (error) {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    return { userDTO, loading, userData };
}
