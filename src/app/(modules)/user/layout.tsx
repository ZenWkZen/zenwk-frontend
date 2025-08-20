'use client';
import { useSidebarContext } from '@user/utils/UseWidthSidebarContext';
import { LOCAL_STORAGE_JWT_ITEM } from '@app/shared/constants/common-constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Footer from '@user/ui/user-feed/Footer';
import HeaderMenu from '@user/ui/user-feed/HeaderMenu';
import Sidebar from '@user/ui/user-feed/Sidebar';
import Spinner from '@app/shared/ui/Spinner';

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
        document.body.style.overflow = 'hidden';

        // console.log('UserLayout - userLocal', userLocal);

        if (userLocal && userLocal.jwt) {
            document.body.style.overflow = '';

            // console.log('UserLayout autorizado:', userLocal);
            setAuthorized(true);
        } else {
            setAuthorized(false);
            router.push('/login'); // redirige si no hay sesión
        }
    }, [router]);

    /**
     * Cargador.
     */
    if (authorized === null || !authorized) {
        return <Spinner />;
    }

    return (
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
    );
}
