import Footer from "<app>/app/components/Footer";
import Header from "<app>/app/components/Header";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="">
                <Header />
                <div className="mt-6">{children}</div>
                <Footer />
            </div>
        </div>
    );
}
