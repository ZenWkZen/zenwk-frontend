"use client";

import React, { useRef } from "react";

type Sexo = "M" | "F" | "O";

interface SexoSelectProps {
    value?: Sexo;
    onChange?: (value: Sexo) => void;
    label?: string;
    disabled?: boolean;
}

const sexos: { label: string; value: Sexo }[] = [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
    { label: "Otro", value: "O" },
];

const SelectSex: React.FC<SexoSelectProps> = ({
    value,
    onChange,
    label = "Sexo",
    disabled = false,
}) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    const handleIconClick = () => {
        if (
            selectRef.current &&
            typeof selectRef.current.showPicker === "function"
        ) {
            selectRef.current.showPicker();
        } else {
            selectRef.current?.focus();
        }
    };

    return (
        <div className="max-auto">
            <div className="relative inline-flex w-full rounded-lg border-1 border-gray-300 bg-gray-50 px-2 py-[0.4rem] text-xs text-gray-500 focus:border-blue-500 focus:ring-blue-500">
                <select
                    //value={value}
                    //onChange={(e) => onChange(e.target.value as Sexo)}
                    disabled={disabled}
                    className="w-full appearance-none truncate bg-transparent pr-6 outline-none"
                >
                    <option value="">Selecciona un sexo...</option>
                    {sexos.map((sexo) => (
                        <option key={sexo.value} value={sexo.value}>
                            {sexo.label}
                        </option>
                    ))}
                </select>

                {/** pointer-events-none: el contenedor del ícono para que el clic pase al <select> */}
                <div className="pointer-events-none absolute right-1.5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-chevron-down-icon lucide-circle-chevron-down text-gray-500"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m16 10-4 4-4-4" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SelectSex;
