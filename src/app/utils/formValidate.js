export const formValidate = () => {
    return {
        requiredEmail: "Por favor, ingresa un email.",
        requiredPassword: "Por favor, ingresa una contraseña.",
        patternEmail: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            message: "Formato de email incorrecto.",
        },

        patternPassword: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/~\\|]).{8,}$/,
            message:
                "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.",
        },

        minLength: {
            value: 6,
            message: "Mínimo 6 carácteres.",
        },

        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                    return "🤡";
                }
                return true;
            },
        },

        validateEquals(value) {
            return {
                equals: (v) => v === value || "No coinciden las contraseñas.",
            };
        },
    };
};
