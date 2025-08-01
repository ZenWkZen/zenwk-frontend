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
        welcome: " Fluye con tu trabajo y conócete en el proceso.",
        subtitle: "Crea tu cuenta y da el primer paso.",
        linkText: "Regístrate",
        promptText: "¿No tienes una cuenta? ",
        enterPassword: "Crea tu contraseña y toma el control de tu jornada!",
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
        // SPA. Envío exitoso de correo
        sendEmail: {
            title: "¡Todo listo!",
            // El componente .jSX debe enviar la variable "keyWord..." para asegurar la redación del mesnaje
            hello: "Si tu correo ",
        },
    },
    commons: {
        sendEmail: {
            // ... se autocompleta el texto con la constante definida en AuthMessages.<Componente>.<sendEmail | |showScreen>.hello
            successText:
                " está asociado a una cuenta ZenWk, pronto recibirás un mensaje con los pasos para restablecer tu contraseña. Respira profundo. Este proceso solo toma unos minutos. No olvides revisar tu bandeja de entrada y también la de spam o correo no deseado. ",
        },
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
