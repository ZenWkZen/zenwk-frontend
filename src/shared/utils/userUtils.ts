/**
 * Generador de edades en el rango de los 13 a 90 años.
 */
export const ageGenerator = Array.from({ length: 78 }, (_, i) =>
    (i + 13).toString()
);
