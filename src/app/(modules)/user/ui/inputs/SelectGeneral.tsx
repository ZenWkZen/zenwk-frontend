import React, { CSSProperties } from 'react';
import Select, {
    StylesConfig,
    components,
    DropdownIndicatorProps,
    ClearIndicatorProps,
} from 'react-select';
import {
    ERROR_COLOR,
    BASE_TEXT_COLOR,
    BOLD_ERROR_COLOR,
    BORDER_COLOR,
} from '@app/styles/constans-color';

/**
 * Constante para select de opciones
 */
export interface InterfaceSelectOption {
    label: string;
    value: string;
}

/**
 *  Interface que representa los datoa a usar en este componente.
 */
interface Props {
    data: Array<string>;
    placeholder: string;
    optionsLabel: string;
    isError?: boolean;
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
const groupStyles = (isError?: boolean): CSSProperties => ({
    display: 'flex',
    justifyContent: 'center', // centrar: space-between;
    alignItems: 'center',
    textTransform: 'none',
    gap: '0.6em',
    paddingBottom: '0.6em',
    color: isError ? BOLD_ERROR_COLOR : '#494F5A',
});

// Estilos icono contador de las opciones 6a7282
const groupBadgeStyles = (isError?: boolean): CSSProperties => ({
    backgroundColor: '#E6E8ED',
    borderRadius: '0.5em',
    color: isError ? BOLD_ERROR_COLOR : '#494F5A', // texto rojo si hay error
    fontSize: '0.98em',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.5em',
    textAlign: 'center',
});

// Estilos personalizados con base en los componentes existes de rect-select.
const customStyles = (
    isError?: boolean
): StylesConfig<Option, false, GroupedOption> => ({
    // Input: tamaño, borde
    control: (provided, state) => ({
        ...provided,
        minHeight: '28px',
        height: '30px',
        fontSize: '12px',
        padding: '0 2px',
        borderRadius: '0.5em',
        borderWidth: '1px',
        borderColor: isError
            ? ERROR_COLOR
            : state.isFocused
              ? '#9FB0BC' // azul-500 (mejor feedback visual)
              : BORDER_COLOR, // gray-300

        boxShadow: state.isFocused
            ? !isError
                ? '0px 0px 1px 1px rgba(159, 176, 188, 0.4)'
                : '0px 0px 1px 1px rgba(231, 123, 115, 0.4)'
            : 'none',

        //transition: 'all 0.15s ease-in-out', // suaviza animación
        '&:hover': {
            borderColor: isError ? ERROR_COLOR : '', // gray-400
        },
    }),

    placeholder: (provided) => ({
        ...provided,
        color: isError ? ERROR_COLOR : BASE_TEXT_COLOR,
        textAlign: 'center',
    }),
    // Input: background
    valueContainer: (provided) => ({
        ...provided,
        height: '28px',
        padding: '0 6px',
        textAlign: 'center',
    }),
    input: (provided) => ({
        ...provided,
        margin: 0,
        padding: 0,
        fontSize: '13px',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '28px',
    }),

    // Icono lista desplegable.
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#9ca3af',
        padding: '3px',
        fontSize: '12px',
        svg: {
            width: '14px',
            height: '14px',
        },
    }),

    // Icono Elminar selección.
    clearIndicator: (provided) => ({
        ...provided,
        padding: '3px',
        fontSize: '12px',
        color: '#9ca3af',
        svg: {
            width: '14px',
            height: '14px',
        },
    }),

    // Indicador de separación ( | ).
    indicatorSeparator: (provided) => ({
        ...provided,
        padding: '0.8px',
        color: '#9ca3af',
        backgroundColor: isError
            ? ERROR_COLOR
            : (provided.backgroundColor ?? '#9ca3af'),
    }),

    /**
     * Opciones del select
     */
    option: (provided, state) => {
        const baseColor: string = isError ? ERROR_COLOR : BASE_TEXT_COLOR;
        // pendiente configurar para modo dark.
        const isDarkGray = baseColor === '#333' || baseColor === '#444';
        return {
            ...provided,
            fontSize: state.isSelected ? '1.1em' : '0.95em',
            padding: '5px 12px',
            textAlign: 'center',
            backgroundColor: state.isSelected
                ? '#9FB0BC'
                : state.isFocused
                  ? '#E6E8ED' // Color de fondo gris claro al hacer hover.
                  : 'transparent',
            color: state.isSelected ? '#FFFFFF' : baseColor,
            ':active': {
                ...provided[':active'],
                backgroundColor: '#d1d5dc', // Fondo leve al hacer clic.
            },
        };
    },

    // Opcion seleccionada y dispuesta en el select
    singleValue: (provided) => ({
        ...provided,
        fontSize: '12px',
        color: isError ? ERROR_COLOR : BASE_TEXT_COLOR,
    }),

    // Menú de opciones.
    menu: (provided) => ({
        ...provided,
        fontSize: '12px',
        borderRadius: '1em',
        border: ` ${isError ? ERROR_COLOR + '1px solid' : 'transparent'}`, // ✅ borde correcto
        borderColor: isError ? ERROR_COLOR : '',
        backgroundColor: 'rgba(255, 255, 255, 1)', // fondo semitransparente
        boxShadow: isError
            ? `0px 0px 2px 1px rgba(231, 123, 115, 0.7)`
            : '0 8px 16px rgba(0, 0, 0, 0.2)', // shadow
    }),

    // Lista interna del menú (elimina 4px extra)
    menuList: (provided) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
    }),

    groupHeading: (provided) => ({
        ...provided,
        textTransform: 'none', // Evita mayúsculas forzadas
        fontSize: '0.98em',
        fontWeight: 600,
        color: '#red',
        align: 'center',
        textAlign: 'center',
    }),
});

// Interface que representa los props para CustomClearIndicator
interface CustomClearIndicatorProps
    extends ClearIndicatorProps<Option, false, GroupedOption> {
    isError?: boolean;
}

// Interface que representa los props para CustomDropdownIndicator
interface CustomDropdownIndicatorProps
    extends DropdownIndicatorProps<Option, false, GroupedOption> {
    isError?: boolean;
}

// Icono personalizado para borrar el contenido.
const CustomClearIndicator = ({
    isError = false,
    ...props
}: CustomClearIndicatorProps) => {
    return (
        <components.ClearIndicator {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isError ? ERROR_COLOR : '#9ca3af'} // ⬅️ aquí aplicamos color dinámico
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-icon"
            >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </components.ClearIndicator>
    );
};

// Icono personalizado.
const CustomDropdownIndicator = ({
    isError = false,
    ...props
}: CustomDropdownIndicatorProps) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isError ? ERROR_COLOR : '#9ca3af'}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-chevron-down"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-4-4" />
            </svg>
        </components.DropdownIndicator>
    );
};

// Encabezado de grupo personalizado
const formatGroupLabel = (
    data: GroupedOption,
    isError?: boolean
): React.JSX.Element => (
    <div style={groupStyles(isError)}>
        <span>{data.label}</span>
        {/** Se inactiva contador de opciones en el campo select.
        <span style={groupBadgeStyles(isError)}>
            {Messages.commons.literalTexts.options}
            <p className="inline-block font-medium"> {data.options.length}</p>
        </span> */}
    </div>
);

/**
 * Select general y personalizado para el componente users, implementación de la librería react-select.
 * @param param0
 * @returns
 */
const SelectGeneral = ({
    data = [],
    optionsLabel,
    placeholder,
    isError,
    value, // react-form
    onChange, // react-form
    onBlur, // react-form
    name, // react-form
    children,
}: Props & {
    value?: { label: string; value: string };
    onChange?: (value: Option | null) => void;
    onBlur?: () => void;
    name?: string;
    children?: React.ReactNode;
}) => {
    const groupedOptions: GroupedOption[] = [
        {
            label: optionsLabel,
            options: data.map((item) => ({
                label: item,
                value:
                    item !== undefined && typeof item === 'string'
                        ? item.toLowerCase().replace(/\s+/g, '-')
                        : item,
            })),
        },
    ];

    // mapear value string a Option
    const selectedOption = value
        ? {
              label: value.label,
              value: value.value.toLowerCase().replace(/\s+/g, '-'),
          }
        : null;

    /**
     * Conponentes JSX, con el select.
     */
    return (
        <div>
            <Select<Option, false, GroupedOption>
                options={groupedOptions}
                formatGroupLabel={(data) => formatGroupLabel(data, isError)}
                styles={customStyles(isError)}
                isClearable
                isSearchable
                placeholder={placeholder}
                value={selectedOption}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                components={{
                    DropdownIndicator: (props) => (
                        <CustomDropdownIndicator {...props} isError={isError} />
                    ),
                    ClearIndicator: (props) => (
                        <CustomClearIndicator {...props} isError={isError} />
                    ),
                }}
            />
            {children}
        </div>
    );
};

export default SelectGeneral;
