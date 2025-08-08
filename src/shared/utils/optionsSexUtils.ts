/**
 *  Valores por defecto con la lista de los sexos pamarametrizados.
 */
export type Sexo = "M" | "F" | "O";

export interface SexoSelectProps {
    value?: Sexo;
    onChange?: (value: Sexo) => void;
    label?: string;
    disabled?: boolean;
}

export const sexos: { label: string; value: Sexo }[] = [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
    { label: "No binario", value: "O" },
];

/**
 * Con base en el array sexos, se genera un nuevo array que contenga solo los label de cada sexo.
 */
export const sexoLabels: string[] = sexos.map((s) => s.label);
