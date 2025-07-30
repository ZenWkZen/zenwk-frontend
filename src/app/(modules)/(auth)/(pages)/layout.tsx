import Footer from "<app>/app/components/Footer";
import Header from "<app>/app/components/Header";
import RegisterFlowProvider from "../context/RegisterFlowContext";

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
