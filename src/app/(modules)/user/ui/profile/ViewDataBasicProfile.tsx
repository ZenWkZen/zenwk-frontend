'use client';
import React, { useState, useRef, useEffect } from 'react';

import { PersonDTO } from '@user/interfaces/person-dto';
import { useSexOptionsContext } from '@user/utils/useSexOptionsContext';
import { getLabelById } from '@app/shared/utils/optionsSexUtils';
import { PencilLine, Camera, Save } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { User } from '@user/context/JwtContext';
import { BarLoader } from 'react-spinners';
import { RingLoader } from 'react-spinners';
import { getInitials } from '@app/shared/utils/stringUtils';
import {
    fetchJwtBaseApi,
    isApiFieldErrorArray,
    isClientErrorMessage,
} from '@app/helpers/fetch-api';

import Tooltip from '@app/shared/ui/Tooltip';

import Text from '@user/ui/user-feed/Text';
import CompleteRegisterForm from '@user/ui/forms/CompleteRegisterForm';
import {
    backendToImageUrl,
    compressImage,
} from '@user/utils/ImageConvertUtils';

interface FormValues {
    firstName: string;
    middleName: string;
    lastName: string;
    middleLastName: string;
    sex: any;
    age: any;
}

/**
 * Funcion que representa la linea de carga al pulsar un botón.
 * @returns
 */
export function LineLoader() {
    return (
        <div className="w-full">
            <BarLoader width={'100%'} height={2} color="#D08BB2" />
        </div>
    );
}

/**
 * Componente que gestiona los datos básicos de la persona.
 * @param param0
 * @returns
 */
const ViewDataBasicProfile = ({
    personDTO,
    updateInfoBasic,
    userData,
    setPersonDTO,
}: {
    personDTO: PersonDTO;
    updateInfoBasic: boolean;
    userData: User;
    setPersonDTO: Dispatch<SetStateAction<PersonDTO | undefined>>;
}) => {
    const refLoadPhotoInput = useRef<HTMLInputElement | null>(null);
    const { optionsSex } = useSexOptionsContext();
    const [editDataBasic, setEditDataBasic] = useState(false);
    const [lineLoading, setLineLoading] = useState(false);
    const [loadPhotoLoading, setLoadPhotoLoading] = useState(false);
    const [savePhotoLoading, setSavePhotoLoading] = useState(false);
    const [activeSavePhoto, setActiveSavePhoto] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [photoProfile, setPhotoProfile] = useState<File>();

    const {
        firstName,
        middleName,
        lastName,
        middleLastName,
        dateOfBirth,
        address,
        age,
        idSex,
        profilePicture,
    } = personDTO;

    // Limpiar el objeto URL cuando cambie la imagen o se desmonte el componente
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    /**
     * Animación para avento clic, boton editar y cancelar.
     */
    const loadingLineClick = async (action?: 'loadPhoto' | 'savePhoto') => {
        try {
            setLineLoading(true);

            if (action === 'loadPhoto') {
                setLoadPhotoLoading(true);
                setActiveSavePhoto(true);
            } else if (action === 'savePhoto') {
                setSavePhotoLoading(true);
            }

            await new Promise((resolve) => setTimeout(resolve, 300));
        } catch (error) {
            throw error;
        } finally {
            setLineLoading(false);

            if (action === 'loadPhoto') {
                setLoadPhotoLoading(false);
            } else if (action === 'savePhoto') {
                setSavePhotoLoading(false);
            }
        }
    };

    /**
     *  Dispara el input invisible
     */
    const handleButtonClick = () => {
        refLoadPhotoInput.current?.click();
    };

    /**
     * Función encargada de la carga de la imagen
     * @param event
     */
    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const compressed = await compressImage(file);
            setPhotoProfile(compressed);

            // Generar preview
            const previewUrl = URL.createObjectURL(compressed);
            setPreview(previewUrl);
        }
    };

    /**
     * Guarda la foto en el sistema.
     */
    const savePhotoHandleClick = async () => {
        try {
            if (photoProfile) {
                const path = '/persons/' + personDTO?.id;

                // Actualizar  estado  personDTO
                setPersonDTO((prev) => {
                    if (!prev) return prev;
                    const updated = {
                        ...prev,
                        profilePicture: photoProfile,
                    };
                    return updated;
                });

                // De debe crear servicio en el backen para poder recibir la imagen.. seguir con el preview
                const formData = new FormData();
                formData.append('profilePicture', photoProfile);
                formData.append('firstName', firstName);
                formData.append('lastName', lastName);

                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }

                if (userData.jwt) {
                    const res = await fetchJwtBaseApi(
                        path,
                        undefined,
                        userData.jwt,
                        formData,
                        'PUT'
                    );

                    console.log(res);
                }

                console.log('savePhotoHandleClick - personDTO', personDTO);
            }
        } catch (error) {
            console.log('error');
            throw error;
        }
    };

    //console.log('viewDataBasicProfile -- PersonDTO:', personDTO);
    return (
        <>
            <div
                className={`${updateInfoBasic && 'bg-gradient-to-tr from-[#F8EDF3] via-white/60 to-white px-2 py-1'} `}
            >
                <Text
                    text="Aquí puedes actualizar tus datos personales y cambiar tu foto de perfil."
                    className="leading-tight font-[300] text-[#B54A87]"
                    sizeOffset={-5}
                />
            </div>
            {/** Línea de carga */}
            {lineLoading ? (
                <LineLoader />
            ) : (
                <div className="h-[2px] w-full bg-gradient-to-b from-[#D08BB2]/70 shadow-md" />
            )}

            <div className="px-2">
                {/** Ftoto de perfil */}
                <Text
                    text="Actualizar foto de perfil"
                    className="py-2 font-[400] text-cyan-800"
                    sizeOffset={10}
                />
                {/** Ftoto de perfil: Gestión de la imagen de perfil */}
                <div className="flex items-center justify-items-center -space-x-4">
                    <div className="flex items-center justify-center -space-x-4">
                        <div
                            className={`${!photoProfile ? 'grid items-center justify-items-center' : 'overflow-hidden'} relative h-25 w-25 rounded-full border border-cyan-900 bg-[#D5DDE2]`}
                        >
                            {/* Texto por defecto */}
                            {!preview && (
                                <Text
                                    text={getInitials(firstName, lastName)}
                                    sizeOffset={20}
                                    className="font-[300] text-cyan-900"
                                />
                            )}

                            {/* Imagen preview */}
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            handleButtonClick(); // Activa el input invisible.
                        }}
                        onChange={() => {
                            loadingLineClick('loadPhoto');
                        }}
                    >
                        {/** input invisible */}
                        <input
                            ref={refLoadPhotoInput}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleFileChange}
                        />
                        <div className="group relative cursor-pointer rounded-full border border-cyan-900 bg-white p-[0.4rem] text-cyan-800 hover:bg-gray-100">
                            {lineLoading && loadPhotoLoading ? (
                                <RingLoader
                                    color="#155E75"
                                    size={17}
                                    speedMultiplier={1.5}
                                />
                            ) : (
                                <Camera size={17} strokeWidth={1.5} />
                            )}
                            <Tooltip position="top">Cargar foto</Tooltip>
                        </div>
                    </button>
                    <div className="flex px-8">
                        {activeSavePhoto && (
                            <button
                                onClick={() => {
                                    loadingLineClick('savePhoto');
                                    savePhotoHandleClick();
                                }}
                                type="button"
                            >
                                <div className="group relative cursor-pointer rounded-full border border-cyan-800 bg-gray-100 p-[0.4rem] text-cyan-800 hover:bg-gray-200">
                                    {lineLoading && savePhotoLoading ? (
                                        <RingLoader
                                            color="#155E75"
                                            size={17}
                                            speedMultiplier={1.5}
                                        />
                                    ) : (
                                        <Save size={16} strokeWidth={1.5} />
                                    )}
                                    <Tooltip position="top">
                                        Guardar foto
                                    </Tooltip>
                                </div>
                            </button>
                        )}
                    </div>
                </div>

                {/** Información personal */}
                <Text
                    text={
                        editDataBasic
                            ? 'Actualizar información personal'
                            : 'Información personal'
                    }
                    className="mt-3 font-[400] text-cyan-800"
                    sizeOffset={10}
                />

                {/** visuliazar y editar la persona */}
                {editDataBasic ? (
                    <div className="origin-left scale-95">
                        <CompleteRegisterForm
                            user={userData}
                            editDataBasic={editDataBasic}
                            setEditDataBasic={setEditDataBasic}
                            personDTO={personDTO}
                            setPersonDTO={setPersonDTO}
                            setLineLoading={setLineLoading}
                            loadingLineClick={loadingLineClick}
                        />
                    </div>
                ) : (
                    <>
                        <div className="mt-3 mb-1 flex columns-2 gap-2 text-gray-500">
                            <Text
                                text="Nombres:"
                                className="font-[370]"
                                sizeOffset={2}
                            />
                            <Text
                                text={firstName + ' ' + middleName}
                                className="font-[300] text-gray-500"
                            />
                        </div>
                        {/** Apellidos */}
                        <div className="mb-1 flex columns-2 gap-2 text-gray-500">
                            <Text
                                text="Apellidos:"
                                className="font-[370]"
                                sizeOffset={2}
                            />
                            <Text
                                text={lastName + ' ' + middleLastName}
                                className="font-[300] text-gray-500"
                            />
                        </div>
                        {/** Sexo, edad y fecha de nacimiento*/}

                        <div className="mb-1 flex columns-2 gap-2">
                            <Text
                                text="Sexo:"
                                className="font-[370] text-gray-500"
                                sizeOffset={2}
                            />
                            <Text
                                text={getLabelById(optionsSex, idSex)}
                                className="font-[300] text-gray-500"
                            />
                        </div>
                        <div className="mb-1 flex columns-2 gap-1">
                            <Text
                                text="Edad:"
                                className="font-[370] text-gray-500"
                                sizeOffset={2}
                            />
                            <Text
                                text={age}
                                className="font-[300] text-gray-500"
                            />
                        </div>

                        {/** Fecha de nacimiento */}
                        <div className="mb-3 flex columns-2 gap-1">
                            <Text
                                text="Fecha de nacimiento:"
                                className="font-[370] text-gray-500"
                                sizeOffset={2}
                            />
                            <Text
                                text={
                                    dateOfBirth ? dateOfBirth : 'No registrado'
                                }
                                className="font-[300] text-gray-500"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setEditDataBasic((prev) => !prev);
                                loadingLineClick();
                            }}
                        >
                            <div className="group relative mt-2 cursor-pointer rounded-md border border-cyan-800 bg-gray-100 p-[0.4rem] text-cyan-800 hover:bg-gray-200">
                                <PencilLine size={16} strokeWidth={1.5} />
                                <Tooltip position="right">Actualizar</Tooltip>
                            </div>
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default ViewDataBasicProfile;
