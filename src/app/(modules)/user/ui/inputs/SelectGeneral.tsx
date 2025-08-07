import React, { CSSProperties } from "react";
import Select, {
    StylesConfig,
    components,
    DropdownIndicatorProps,
    ClearIndicatorProps,
} from "react-select";

import { Messages } from "@app/shared/constants/messages";
import { SexoSelectProps } from "@app/shared/utils/optionsSexUtils";

/**
 *  Interface que representa los datoa a usar en este componente.
 */
interface Props {
    data: Array<string>;
    placeholder: string;
    optionsLabel: string;
}

// Tipos para las opciones
interface Option {
    label: string;
    value: string;
}

interface GroupedOption {
    label: string;
    options: Option[];
}

// Estilos del encabezado de grupo
const groupStyles: CSSProperties = {
    display: "flex",
    justifyContent: "center", // centrar: space-between;
    alignItems: "center",
    fontWeight: "normal",
    textTransform: "none",
    gap: "0.6em", // Seperación
    paddingBottom: "0.6em",
};

// Estilos icono contador de las opciones 6a7282
const groupBadgeStyles: CSSProperties = {
    backgroundColor: "#E6E8ED",
    borderRadius: "0.5em",
    color: "#494F5A",
    fontSize: "0.98em",
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.5em",
    textAlign: "center",
};

// Estilos personalizados con base en los componentes existes de rect-select.
const customStyles: StylesConfig<Option, false, GroupedOption> = {
    // Input: tamaño, borde
    control: (provided, state) => ({
        ...provided,
        minHeight: "28px",
        height: "30px",
        fontSize: "12px",
        padding: "0 2px",
        borderRadius: "0.5em",
        borderColor: state.isFocused ? "#9ca3af" : "#d1d5dc", // equivale a hover border.
        boxShadow: "none",
        "&:hover": {
            borderColor: "#9ca3af", // Borde gris al pasar el mouse.
        },
    }),
    // Input: background
    valueContainer: (provided) => ({
        ...provided,
        height: "28px",
        padding: "0 6px",
        textAlign: "center",
    }),
    input: (provided) => ({
        ...provided,
        margin: 0,
        padding: 0,
        fontSize: "13px",
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: "28px",
    }),

    // Icono lista desplegable.
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "#9ca3af",
        padding: "3px",
        fontSize: "12px",
        svg: {
            width: "14px",
            height: "14px",
        },
    }),

    // Icono Elminar selección.
    clearIndicator: (provided) => ({
        ...provided,
        padding: "3px",
        fontSize: "12px",
        color: "#9ca3af",
        svg: {
            width: "14px",
            height: "14px",
        },
    }),

    // Indicador de separación ( | ).
    indicatorSeparator: (provided) => ({
        ...provided,
        padding: "0.8px",
        color: "#9ca3af",
    }),

    /**
     * Opciones del select
     */
    option: (provided, state) => {
        const baseColor: string = "#6a7282";
        // pendiente configurar para modo dark.
        const isDarkGray = baseColor === "#333" || baseColor === "#444";
        return {
            ...provided,
            fontSize: state.isSelected ? "1.1em" : "0.95em",
            padding: "5px 14px",
            textAlign: "center",

            backgroundColor: state.isSelected
                ? "#9FB0BC"
                : state.isFocused
                  ? "#E6E8ED" // Color de fondo gris claro al hacer hover.
                  : "transparent",
            color: state.isSelected ? "#FFFFFF" : baseColor,
            ":active": {
                ...provided[":active"],
                backgroundColor: "#d1d5dc", // Fondo leve al hacer clic.
            },
        };
    },

    // Opcion seleccionada y dispuesta en el select
    singleValue: (provided) => ({
        ...provided,
        fontSize: "12px",
        color: "#6a7282",
    }),

    // Menú de opciones.
    menu: (provided) => ({
        ...provided,
        fontSize: "12px",
        borderRadius: "1em",
        backgroundColor: "rgba(255, 255, 255, 1)", // fondo semitransparente
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // sombra hacia abajo, más difuminada
    }),

    groupHeading: (provided) => ({
        ...provided,
        textTransform: "none", // Evita mayúsculas forzadas
        fontSize: "0.98em",
        fontWeight: 600,
        color: "#333",
        align: "center",
        textAlign: "center",
    }),
};

// Icono personalizado para borrar el contenido.
const CustomClearIndicator = (
    props: ClearIndicatorProps<Option, false, GroupedOption>
) => {
    return (
        <components.ClearIndicator {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="llucide lucide-x-icon lucide-x text-gray-400"
            >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </components.ClearIndicator>
    );
};

// Icono personalizado.
const CustomDropdownIndicator = (
    props: DropdownIndicatorProps<Option, false, GroupedOption>
) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14" // el tamaño se agusta en el Hook IndicatorDownDown.
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-chevron-down text-gray-400"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-4-4" />
            </svg>
        </components.DropdownIndicator>
    );
};

// Encabezado de grupo personalizado
const formatGroupLabel = (data: GroupedOption): React.JSX.Element => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>
            {Messages.commons.literalTexts.options}
            <p className="inline-block font-medium"> {data.options.length}</p>
        </span>
    </div>
);

/**
 * Select general y personalizado para el componente users, se hace de la librería react-select.
 * @param param0
 * @returns
 */
const SelectGeneral = ({ data = [], optionsLabel, placeholder }: Props) => {
    const dataObj = data as SexoSelectProps;

    if (dataObj != null) {
        console.log("data x......", data);
    }
    const groupedOptions: GroupedOption[] = [
        {
            label: optionsLabel,
            options: data.map((item) => ({
                label: item,
                value:
                    item !== undefined && typeof item === "string"
                        ? item.toLowerCase().replace(/\s+/g, "-")
                        : item,
            })),
        },
    ];

    /**
     * Conponentes JSX, con el select.
     */
    return (
        <Select<Option, false, GroupedOption>
            options={groupedOptions}
            formatGroupLabel={formatGroupLabel}
            styles={customStyles}
            isClearable
            isSearchable
            placeholder={placeholder}
            components={{
                DropdownIndicator: CustomDropdownIndicator,
                ClearIndicator: CustomClearIndicator,
            }}
        />
    );
};

export default SelectGeneral;
