import React from 'react';

/**
 * Buttom cerrar
 * @param param0
 * @returns
 */
const CloseButtom = ({ handleClose }: { handleClose?: () => void }) => {
    return (
        <button
            type="button"
            className="group absolute end-3.5 top-3 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg bg-transparent text-gray-700 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-400 dark:hover:text-white"
            onClick={handleClose}
        >
            {/** Icono cerrrar popup */}
            <svg
                className="cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                width={10}
                height={10}
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
            </svg>
            {/* <Tooltip position="top" hiddenArrow={false}>
        Cerrar modal
    </Tooltip> */}
        </button>
    );
};

export default CloseButtom;
