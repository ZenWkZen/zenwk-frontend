export const Messages = {
    PAGE_LOGIN_TEXT: {
        TITLE_WELCOME_GENERAL: "Bienvenido a ZenWk",
        SUBTITLE_WELCOME_GENERAL:
            "Inicia sesión y descubre el equilibrio entre productividad y bienestar.",
        NOT_REGISTERED: "¿No tienes una cuenta?",
        LABEL_EMAIL: "Dirección de email",
        LABEL_PASSWORD: "Ingresa tu contraseña",
    },
    REGISTER: {
        REGISTER_LABEL: "Registrate",
    },
    AUTH: {
        FORGOT_PASSWORD: "¿Olvidaste tu contraseña? Restablécela",
    },
    FORGOT_PASSWORD: {
        TITLE: "¿Olvidaste tu contraseña?",
        SUBTITLE:
            "No te preocupes, a todos nos pasa. Comparte tu email y te ayudamos a volver.",
        INFO: (email: string) => `
      Si existe una cuenta de ZenWk asociada al correo ${email}, te enviaremos instrucciones para restablecer tu contraseña.

      Este mensaje llegará a tu bandeja en los próximos minutos. Respira profundo y revisa también la carpeta de spam o correo no deseado.
    `,
    },
    VALIDATION: {},
    BUTTONS: {
        FORGOT_PASSWORD: "Sí, olvidé mi contraseña",
    },
    MESSAGES: {
        CHECK_EMAIL:
            "Hemos enviado un código a tu correo. Por favor, revisa tu bandeja de entrada.",
        CODE_EXPIRED: "El código ha expirado. Solicita uno nuevo.",
        INVALID_CODE: "El código ingresado no es válido.",
    },
};
