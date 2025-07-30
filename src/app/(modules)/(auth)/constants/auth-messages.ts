/**
 * Mensajes para las page para el módulo (auth)
 */
export const AuthMessages = {
    login: {
        title: "Bienvenido a ZenWk",
        subtitle:
            "Inicia sesión y descubre el equilibrio entre productividad y bienestar.",
    },
    register: {
        title: "Empieza a usar ZenWk",
        subtitle: "Crea tu cuenta y da el primer paso.",
        linkText: "Regístrate",
        promptText: "¿No tienes una cuenta? ",
    },
    otp: {
        title: "Ingresa el código que llegó a tu correo",
        subtitleSendEmail: "Te hemos enviado un código al correo:",
        subtitleEnterCode: " ingresa el código recibido para continuar",
        emailNotFound: "¿No ves nuestro correo en tu bandeja de entrada?",
        codeResentSuccess: "¡Código reenviado exitosamente! Revisa tu correo.",
        emailSent:
            "Hemos enviado un código a tu correo. Por favor, revisa tu bandeja de entrada.",
        checkSpamOrClick: "Revisa tu carpeta de spam o haz clic ",
        resendCodeLink: " para reenviar el código.",
    },
    forgotPassword: {
        title: "¿Olvidaste tu contraseña?",
        subtitle:
            "No te preocupes, a todos nos pasa. Ingresa tu email y te ayudamos.",
        linkText: "¿Olvidaste tu contraseña? Restablécela",
        emailSent: (email: string) => `
            Si existe una cuenta de ZenWk asociada al correo ${email}, te enviaremos instrucciones para restablecer tu contraseña.
            Este mensaje llegará en los próximos minutos. Revisa también tu carpeta de spam o correo no deseado.
          `,
    },
    placeholder: {
        password: "Ingresa tu contraseña",
    },
    setPassword: {
        title: "Elige una contraseña",
    },
    inputs: {
        email: "Dirección de email",
        password: "Ingresa tu contraseña",
        repasword: "Confirmar contraseña",
    },
    buttons: {
        forgotPassword: "Sí, olvidé mi contraseña",
        login: "Inicia tu momento",
        registerWithEmail: "Continuar con email",
    },
};
