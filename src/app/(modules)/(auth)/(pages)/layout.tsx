import Footer from "@app/shared/components/Footer";
import Header from "@app/shared/components/Header";

/**
 * Layout general para las páginas de autenticación.
 * Envuelve el contenido con el proveedor de flujo de registro (`RegisterFlowProvider`)
 * y renderiza el encabezado (`Header`), el contenido (`children`) y el pie de página (`Footer`).
 */
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            <Header />
            <main className="flex flex-1 items-start justify-center px-4 pt-15">
                {/* Contenido centrado vertical y horizontal */}
                <div className="w-full max-w-[860px]">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
