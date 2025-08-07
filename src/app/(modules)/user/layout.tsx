import Footer from "@app/shared/components/Footer";
import Header from "@app/shared/components/Header";

/**
 * Layout general para las páginas del módulo de usuarios.
 * Envuelve el contenido con el encabezado (`Header`), el contenido (`children`)
 * y el pie de página (`Footer`), con diseño responsive.
 */
export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            {/* Encabezado fijo en la parte superior */}
            <Header />

            {/* Contenido principal, centrado y responsive */}
            <main className="flex flex-1 justify-center px-4 py-10 sm:px-6 md:px-8">
                <div className="">{children}</div>
            </main>

            {/* Pie de página */}
            <Footer />
        </div>
    );
}
