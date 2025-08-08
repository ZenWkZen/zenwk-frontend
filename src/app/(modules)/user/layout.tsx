import Footer from "@user/ui/user-feed/Footer";
import HeaderMenu from "@user/ui/user-feed/HeaderMenu";
import Sidebar from "@user/ui/user-feed/Sidebar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Ejemplo de secciones con tres opciones cada una
    const menuSections = [
        {
            title: "Perfil",
            links: [
                { label: "Ver perfil", href: "/perfil" },
                { label: "Editar perfil", href: "/perfil/editar" },
                { label: "Seguridad", href: "/perfil/seguridad" },
            ],
        },
        {
            title: "Configuración",
            links: [
                { label: "Preferencias", href: "/config/preferencias" },
                { label: "Notificaciones", href: "/config/notificaciones" },
                { label: "Privacidad", href: "/config/privacidad" },
            ],
        },
        {
            title: "Soporte",
            links: [
                { label: "FAQ", href: "/soporte/faq" },
                { label: "Contacto", href: "/soporte/contacto" },
                { label: "Reportar error", href: "/soporte/reporte" },
            ],
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            {/* Encabezado */}
            <HeaderMenu />

            {/* Contenido con sidebar */}
            <main className="flex flex-1 gap-6 px-4 py-10 sm:px-6 md:px-8">
                {/* Menú lateral */}
                <Sidebar sections={menuSections} />

                {/* Contenido principal */}
                <div className="flex-1">{children}</div>
            </main>

            {/* Pie de página */}
            <Footer />
        </div>
    );
}
