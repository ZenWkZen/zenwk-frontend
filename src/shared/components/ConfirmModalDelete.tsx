import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useSidebarContext } from '@user/utils/useWidthSidebarContext';
import { UserX, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Text from '@user/ui/user-feed/Text';
import CloseButtom from './CloseButtom';

/**
 * Componente modal de confirmación para eliminación.
 */
const ConfirmModalDelete = ({
    setConfirm,
    setLaunchModal,
    titleText,
    btConfirmText,
}: {
    setConfirm: Dispatch<SetStateAction<boolean>>;
    setLaunchModal: Dispatch<SetStateAction<boolean>>;
    titleText: string;
    btConfirmText: string;
}) => {
    const router = useRouter();
    const { sidebarWidth } = useSidebarContext();
    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [countdown, setCountdown] = useState(10);

    // Activa animación de entrada al montarse
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    // Animación cerrar modal de confirmación.
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setLaunchModal(false);
            setIsClosing(false);
        }, 400); // coincide con duration-400
    };

    /**
     * Acción eliminar
     */
    const handleDelete = () => {
        setDelete(true);
        setConfirm(true);

        let seconds = 10;
        setCountdown(seconds);

        const interval = setInterval(() => {
            seconds -= 1;
            setCountdown(seconds);

            if (seconds <= 0) {
                clearInterval(interval);
                // Redirige al inicio
                router.push('/');
            }
        }, 1000);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/40 transition-opacity duration-400 ease-in-out select-none ${
                isClosing ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div
                className={`relative max-h-full w-full max-w-md transform p-4 transition-all duration-400 ease-in-out ${
                    isClosing || !isVisible
                        ? 'scale-95 opacity-0'
                        : 'scale-100 opacity-100'
                }`}
                style={{ marginLeft: `${sidebarWidth}px` }}
            >
                <div className="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
                    <div className="p-4 text-center md:p-5">
                        {isDelete ? (
                            // Estado de eliminación en progreso con conteo
                            <div className="flex flex-col items-center">
                                <Text
                                    text="¡Listo! Tu Cuenta ha sido  elminiado con éxito"
                                    sizeOffset={3}
                                    className="mx-auto mt-5 rounded-xl bg-[#EBF9F0] p-2 text-center font-[400] text-emerald-700"
                                />
                                <Loader2
                                    size={30}
                                    strokeWidth={1.5}
                                    className="my-3 animate-spin text-emerald-700"
                                />

                                <Text
                                    text={`Redirigiendo al inicio en  ${countdown} segundos`}
                                    sizeOffset={5}
                                    className="mb-5 font-[350] text-gray-500"
                                />
                            </div>
                        ) : (
                            <div>
                                {/** botón cerrar */}
                                <CloseButtom handleClose={handleClose} />
                                {/** Contenido modal */}
                                <UserX
                                    size={23}
                                    strokeWidth={1.3}
                                    className="mx-auto mb-4 text-gray-700"
                                />

                                <Text
                                    text={titleText}
                                    sizeOffset={5}
                                    className="mb-5 font-[300] text-gray-700"
                                />
                                <button
                                    type="button"
                                    className=""
                                    onClick={handleDelete}
                                >
                                    <Text
                                        text={btConfirmText}
                                        className="cursor-pointer rounded-lg bg-[#EB333A] p-[0.3rem] px-3 font-[300] text-white hover:bg-red-700"
                                        sizeOffset={0}
                                    />
                                </button>
                                <button
                                    onClick={handleClose}
                                    type="button"
                                    className="ms-3"
                                >
                                    <Text
                                        text="Cancelar"
                                        className="cursor-pointer rounded-lg bg-gray-100 p-[0.3rem] px-3 font-[350] text-gray-700 hover:bg-gray-300 hover:text-black"
                                        sizeOffset={0}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModalDelete;
