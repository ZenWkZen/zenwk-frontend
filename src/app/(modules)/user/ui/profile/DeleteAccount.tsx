import { useEffect, useState } from 'react';
import { UserX } from 'lucide-react';

import ProfileItemHeader from '@user/components/profile/ProfileItemHeader';
import ProfileButtomForm from '@user/components/profile/ProfileButtomForm';
import ConfirmModalDelete from '@app/shared/components/ConfirmModalDelete';

const DeleteAccount = () => {
    const [lineLoading, setLineLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [launchModal, setLaunchModal] = useState(false);

    /**
     * Se ejecuta cuando el hijo hace uso de setConfirm
     */
    useEffect(() => {
        if (confirm) {
            deleteAccount();
        }
    }, [confirm]);

    /**
     * Método para la elminación del cuenta.
     */
    const deleteAccount = () => {
        console.log('...deleteAccount...', confirm);
        if (confirm) {
            console.log('Iniciando la eliminación de la cuenta ... ');
        }
    };

    return (
        <div>
            <ProfileItemHeader lineLoading={lineLoading} />
            <div
                className="mx-auto flex w-full max-w-[260px] flex-col items-center rounded-md py-8"
                onClick={() => setLaunchModal((prev) => !prev)}
            >
                <ProfileButtomForm
                    lineLoading={lineLoading}
                    icon={<UserX size={17} strokeWidth={1.5} />}
                    shape="square"
                    positionToltip="top"
                    nameButtom="Eliminar cuenta "
                />
            </div>
            {/* Modal de confirmación */}
            {launchModal && (
                <ConfirmModalDelete
                    setLaunchModal={setLaunchModal}
                    setConfirm={setConfirm}
                    titleText="¿Está seguro de eliminar su cuenta?"
                    btConfirmText="Eliminar definitivamente"
                />
            )}
        </div>
    );
};
export default DeleteAccount;
