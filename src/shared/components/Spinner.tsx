import React from "react";
import { PropagateLoader } from "react-spinners";

/**
 * Componente Spinner. Animación para indicador de carga.
 * @param loading
 * @returns
 */
const Spinner = () => {
    return (
        <div className="text-center">
            <PropagateLoader
                color="#2c975c"
                loading
                size={6}
                speedMultiplier={1}
            />
        </div>
    );
};

export default Spinner;
