"use client";
import { useSidebarContext } from "@user/utils/UseWidthSidebarContext";

import Footer from "@user/ui/user-feed/Footer";
import HeaderMenu from "@user/ui/user-feed/HeaderMenu";
import Sidebar from "@user/ui/user-feed/Sidebar";

export default function UserLayout({
    children,
    isSidebarExpanded = true, // Recibe el estado del Sidebar como prop
}: {
    children: React.ReactNode;
    isSidebarExpanded: boolean;
}) {
    const { sidebarWidth } = useSidebarContext();
    console.log("ancho de sidebar....", sidebarWidth);

    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            {/* Encabezado */}
            <HeaderMenu />

            {/* Contenido con sidebar */}
            <main className="flex flex-1">
                {/* El Sidebar con sus propias animaciones */}
                <Sidebar />

                {/* Contenido principal animado */}
                <div
                    className="gap-6 px-4 py-10 transition-all duration-400 ease-in-out sm:px-6 md:px-8"
                    style={{ width: `calc(100% - ${sidebarWidth}px)` }}
                >
                    <div className="flex items-center justify-center">
                        {children}
                    </div>
                </div>
            </main>

            {/* Pie de página */}
            <Footer style={{ marginLeft: `${sidebarWidth}px` }} />
        </div>
    );
}
