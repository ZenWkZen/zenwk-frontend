import { RegisterOptions } from "react-hook-form";

/**
 * Define y retorna un conjunto de validaciones comunes para
 * formularios de datos personales de usuario: nombres, apellidos,
 * edad y sexo.
 */
export const formValidateUser = () => {
    // Mensajes genéricos de requerido
    const requiredFirstName = "Por favor, ingresa tu primer nombre.";
    const requiredLastName = "Por favor, ingresa tu primer apellido.";
    const requiredAge = "Por favor, selecciona tu edad.";
    const requiredSex = "Por favor, selecciona tu sexo.";

    // Validación para nombres y apellidos: solo letras y espacios
    const patternName: RegisterOptions["pattern"] = {
        value: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/,
        message: "Solo se permiten letras y espacios.",
    };

    // Longitud mínima y máxima para nombres/apellidos
    const minLengthName: RegisterOptions["minLength"] = {
        value: 2,
        message: "Mínimo 2 caracteres.",
    };

    const maxLengthName: RegisterOptions["maxLength"] = {
        value: 50,
        message: "Máximo 50 caracteres.",
    };

    // Validación para edad (solo números y rango válido)
    const patternAge: RegisterOptions["pattern"] = {
        value: /^[0-9]+$/,
        message: "La edad debe ser un número.",
    };

    const validateAge: RegisterOptions["validate"] = {
        range: (v: string) => {
            const num = parseInt(v, 10);
            if (isNaN(num)) return "Edad no válida.";
            if (num < 0) return "La edad no puede ser negativa.";
            if (num > 120) return "Edad no válida (máx 120).";
            return true;
        },
    };

    // Validación de espacios vacíos
    // const validateTrim: RegisterOptions["validate"] = {
    //     trim: (v: string) => {
    //         if (!v.trim()) return "El campo no puede estar vacío.";
    //         return true;
    //     },
    // };

    const validateTrim = (v: string): string | true => {
        if (!v.trim()) return "El campo no puede estar vacío.";
        return true;
    };

    // Retorna todas las validaciones disponibles para los formularios
    return {
        requiredFirstName,
        patternName,
        minLengthName,
        maxLengthName,
        validateTrim,
        requiredLastName,
        requiredAge,
        requiredSex,
        validateAge,
        patternAge,
    };
};
