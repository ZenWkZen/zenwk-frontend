'use client';
import { useSidebarContext } from '@user/utils/UseWidthSidebarContext';
import { LOCAL_STORAGE_JWT_ITEM } from '@app/shared/constants/common-constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchGetUser } from '@auth/utils/authUtils';
import { UserDTO } from './types/user-dto';

import Footer from '@user/ui/user-feed/Footer';
import HeaderMenu from '@user/ui/user-feed/HeaderMenu';
import Sidebar from '@user/ui/user-feed/Sidebar';
import Spinner from '@app/shared/ui/Spinner';
import SexOptionsContextProvider from '@user/context/SexOptionsContext';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
    isSidebarExpanded: boolean;
}) {
    const { sidebarWidth } = useSidebarContext();
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    /**
     * useEffect que redirige a login  si no existe sesión activa.
     */
    useEffect(() => {
        const userDataTemp = localStorage.getItem(LOCAL_STORAGE_JWT_ITEM);
        const userLocal = userDataTemp ? JSON.parse(userDataTemp) : null;

        const loadUser = async (): Promise<UserDTO | false> => {
            try {
                return await fetchGetUser(userLocal);
            } catch (error) {
                return false;
            }
        };

        // Cubre los dos escenarios posibles:
        // 1. Cierre de sesión
        // 2. Expiración del token (no importa si queda guardado en localstorage)
        const validateSession = async () => {
            if (userLocal && userLocal.jwt) {
                const result = await loadUser();
                if (!result) {
                    setAuthorized(false);
                    router.push('/login');
                } else {
                    setAuthorized(true);
                }
            } else {
                setAuthorized(false);
                router.push('/login');
            }
        };

        validateSession();
    }, []);

    /**
     * Bloquea scroll mientras está cargando autorización.
     * Evita warning generado en el navegador.
     */
    useEffect(() => {
        if (authorized === null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [authorized, router]);

    /**
     * Cargador.
     */
    if (authorized === null || !authorized) {
        return <Spinner />;
    }

    return (
        <SexOptionsContextProvider>
            <div className="flex min-h-screen flex-col bg-gray-100">
                {/* Encabezado */}
                <HeaderMenu />

                {/* Contenido con sidebar */}
                <main className="flex flex-1">
                    <Sidebar />

                    <div className="flex-1 gap-6 px-4 py-10 transition-all duration-400 ease-in-out sm:px-6 md:px-8">
                        <div>{children}</div>
                    </div>
                </main>

                {/* Pie de página */}
                <Footer style={{ marginLeft: `${sidebarWidth}px` }} />
            </div>
        </SexOptionsContextProvider>
    );
}
