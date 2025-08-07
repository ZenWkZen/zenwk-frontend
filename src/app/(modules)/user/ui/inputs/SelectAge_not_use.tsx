import React from "react";
import Select from "react-select";

const SelectAge = () => {
    const edades = Array.from({ length: 78 }, (_, i) => i + 13); // 13 a 100 años

    return (
        <div className="relative mx-auto inline-flex w-full rounded-lg border-1 border-gray-300 bg-gray-50 px-2 py-[0.4rem] text-xs text-gray-500 focus:border-blue-500 focus:ring-blue-500">
            <select
                id="edad"
                //value={edad}
                // onChange={(e) => setEdad(Number(e.target.value))}
                // className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                className="w-full appearance-none truncate bg-transparent pr-6 text-center outline-none"
            >
                <option value="" className="items-center">
                    Seleccione una edad...
                </option>
                {edades.map((edad) => (
                    <option key={edad} value={edad}>
                        {edad}
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
    );
};

export default SelectAge;
