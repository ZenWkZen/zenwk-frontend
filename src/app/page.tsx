import { Span } from "next/dist/trace";
import HeaderText from "./(modules)/(auth)/components/HeaderText";
import SubTitle from "./(modules)/(auth)/components/SubTitle";
import Title from "./(modules)/(auth)/components/Title";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Link from "next/link";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

/**
 * @abstract Componente home.Información general de ZenWk.
 * @returns
 */

// bg-[#53aea0]
const Home = () => {
    return (
        <div className="bg-gray-100">
            <Header
                content={
                    <div className="space-x-3">
                        <Link href="/login">
                            <PersonOutlineOutlinedIcon className="rounded-2xl border-2 !text-[1.5rem] text-cyan-900 hover:border-emerald-950 hover:bg-emerald-950 hover:text-gray-200" />
                        </Link>
                        <Link
                            href="/register"
                            className="bg-cyan-900 px-2.5 py-2 font-extralight text-white transition-all hover:border-emerald-300 hover:bg-emerald-950 hover:text-white"
                        >
                            Registrarse
                        </Link>
                    </div>
                }
                bgColor="bg-[#a3c9c7]"
            />
            <div className="mx-auto max-w-[800px] bg-gray-100 px-4">
                <Title
                    title={
                        <span className="text-cyan-800">
                            Registra tus horas de forma motivadora y con
                            retroalimentación
                        </span>
                    }
                />
                <SubTitle
                    text={
                        <div className="mb-10 px-10">
                            <span className="mx-2 font-normal">
                                Optimizando el seguimiento de tiempo en
                                empresas, emprendimientos y proyectos
                                personales. Transformando una rutina
                                habitualmente aburrida en una experiencia útil y
                                enriquecedora.
                            </span>
                        </div>
                    }
                />

                <HeaderText
                    text={
                        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
                            <Link href="/register">
                                <span className="mx-3 w-full rounded-3xl bg-cyan-900 px-5 py-3 font-light text-white hover:bg-cyan-950">
                                    Únete a ZenWK
                                </span>
                            </Link>

                            <span className="rounded-3xl border-2 bg-white px-5 py-2 font-normal text-cyan-800 hover:border-gray-700 hover:bg-gray-300 hover:text-gray-700 max-[400px]:px-3 max-[400px]:py-2 max-[400px]:text-sm">
                                Así se transforma
                            </span>
                        </div>
                    }
                />
            </div>
            <Footer
                content={
                    <p className="text-sm text-gray-700">
                        © 2025 Alineumsoft. Todos los derechos reservados.
                    </p>
                }
                bgColor="bg-[#a3c9c7]"
            />
        </div>
    );
};

export default Home;
