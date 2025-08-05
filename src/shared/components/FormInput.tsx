import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthMessages } from "@auth/constants/auth-messages";

import Label from "./Label";

/**
 * Props para el compomente FromInput
 */
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Texto que se mostrará como etiqueta del campo */
    label: string;
    /** Indica si el campo tiene un error de validación */
    isError?: boolean;
    /** Elementos hijos, por ejemplo mensajes de error */
    children: React.ReactNode;
}

/**
 * Componente reutilizable para renderizar un campo de entrada con etiqueta y estilos adaptables a errores.
 */
const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {
        type = "text",
        isError = false,
        label,
        children,
        placeholder,
        onBlur,
        name,
        onChange,
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const onType = () => {
        if (type === "password") {
            return showPassword ? "text" : "password";
        }
    };

    const handleClick = () => setShowPassword((prev) => !prev);

    /**
     * Funcion que evita atajos de teclado como Ctrl+X y Ctrl+V.
     * @param e
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            type === "password" &&
            (e.ctrlKey || e.metaKey) &&
            (e.key === "v" || e.key === "x")
        ) {
            e.preventDefault();
        }
    };
    /**
     * Funcion que bloquea pegar con clic derecho o menú del sistema.
     * @param e
     */
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (type === "password") {
            e.preventDefault();
        }
    };
    /**
     * Funcion que bloquea cortar con clic derecho o menú del sistema.
     * @param e
     */
    const handleCut = (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (type === "password") {
            e.preventDefault();
        }
    };

    /**
     * Conponente JSX - Input para formulario
     */
    return (
        <div className="mb-3">
            <Label text={label} />
            <div className="relative h-9 w-full">
                <input
                    className={`h-full w-full rounded-lg border p-2.5 ${type === "password" && "pr-10"} placeholder:text-gray-400 sm:w-[400px] ${
                        isError
                            ? "border-red-500 bg-red-50 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
                            : "border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    }`}
                    type={onType()}
                    placeholder={placeholder}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    onCut={handleCut}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                />
                {/** Si el input es tipo password se habilita el botón ver / ocultar password */}
                {type === "password" && (
                    <button
                        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                        onClick={handleClick}
                    >
                        <div className="group relative">
                            {showPassword ? (
                                <EyeOff
                                    className="text-gray-500 hover:text-gray-700"
                                    size={15}
                                />
                            ) : (
                                <Eye
                                    className="text-gray-500 hover:text-gray-700"
                                    size={15}
                                />
                            )}
                            {/** tooltip */}
                            <div className="absolute -top-10 left-1/2 z-10 flex -translate-x-1/2 scale-0 flex-col items-center transition-transform group-hover:scale-100 group-hover:opacity-60">
                                <div className="rounded bg-black px-3 py-1.5 text-xs whitespace-nowrap text-white">
                                    {showPassword
                                        ? AuthMessages.tooltip.hidePassword
                                        : AuthMessages.tooltip.showPassword}
                                </div>
                                <div className="mt-[-4px] h-2 w-2 rotate-45 bg-black"></div>
                            </div>
                        </div>
                    </button>
                )}
            </div>
            {children}
        </div>
    );
});

export default FormInput;
