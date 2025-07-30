import Footer from "@app/shared/components/Footer";
import Header from "@app/shared/components/Header";
import RegisterFlowProvider from "../context/RegisterFlowContext";

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
        <RegisterFlowProvider>
            <div className="min-h-screen bg-gray-100">
                <div className="">
                    <Header />
                    <div className="mt-6">{children}</div>
                    <Footer />
                </div>
            </div>
        </RegisterFlowProvider>
    );
}
