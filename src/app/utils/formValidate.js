export const formValidate = () => {
  return {
    requiredEmail: "Por favor, ingresa un email.",
    requiredPassword: "Por favor, ingresa una contraseña.",
    patternEmail: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      message: "Formato de email incorrecto.",
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
