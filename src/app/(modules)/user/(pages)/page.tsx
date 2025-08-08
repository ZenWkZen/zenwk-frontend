"use client";
import { useRouter } from "next/navigation";
import { fetchJwtBaseApi } from "@app/helpers/fetch-api";
import { UserMessages } from "../constants/user-messages";
import { UserDTO, UserStateEnum } from "@user/interfaces/user-dto";
import React, { useEffect, useState } from "react";
import Title from "@user/ui/user-feed/Title";

import Spinner from "@app/shared/components/Spinner";
import Subtitle from "@user/ui/user-feed/Subtitle";
import InputText from "@user/ui/inputs/InputText";
import Button from "@user/ui/Buttons/Button";
import SelectGeneral from "@user/ui/inputs/SelectGeneral";
import { ageGenerator } from "@app/shared/utils/userUtils";

import { sexoLabels } from "@app/shared/utils/optionsSexUtils";

/** Componente encargado de consultar el usuario con los datos envidados después del login.
 * Si el jwt ha esxpirado retorna a la pagina del login.
 */
const WelcomeUser = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    //const { user } = useJwtContext(); // ineceario por el localStorage
    const [userDTO, setUserDTO] = useState<UserDTO>();

    /**
     *  Use efect para recuperar el useJwtContext y consultar el usuario.
     **/
    useEffect(() => {
        // Se obtiene desde el LocalStorage
        const userData = localStorage.getItem("jwt-user");
        const userLocal = userData ? JSON.parse(userData) : "";

        /**
         * Consume el Api consulta afiliado por id.
         * @returns
         */
        const fetchGetUser = async () => {
            try {
                const pathFindByIdUser = "/users/" + userLocal.userId;
                const res = await fetchJwtBaseApi(
                    pathFindByIdUser,
                    undefined,
                    userLocal.jwt,
                    undefined,
                    "GET"
                );
                setUserDTO(res);
            } catch (error) {
                return router.push("/login");
            }
        };

        if (userLocal && userLocal.jwt) {
            const pathFindByIdUser = "/user/" + userLocal.userId;
            fetchGetUser();
            setLoading(false);
        } else {
            return router.push("/login");
        }
    }, []);

    /**
     * Spinner para el render.
     */
    if (loading) {
        return <Spinner />;
    }

    /**
     * Componente JSX con la pagina del usuario
     */
    return (
        <div className="mx-auto max-w-lg">
            <Title
                text={
                    <div className="mb-5 inline-block px-7 text-center font-medium text-cyan-800">
                        {UserMessages.welcome.title}
                        <label className="font-bold">{userDTO?.username}</label>
                        {UserMessages.welcome.subtitle}
                    </div>
                }
            />

            {/** Formulario para completar los datos personales */}
            <div className="grid place-items-center">
                {userDTO != undefined &&
                    userDTO.state === UserStateEnum.INCOMPLETE_PERFIL && (
                        <div className="max-w-[700px] rounded-xl border border-gray-200 shadow-xl shadow-gray-300">
                            <article className="px-7 py-5">
                                <div className="mb-4">
                                    <Title
                                        text={
                                            <label>
                                                {
                                                    UserMessages.welcome
                                                        .completeRegister
                                                }
                                            </label>
                                        }
                                    />
                                </div>

                                <form className="mx-auto max-w-md">
                                    <Subtitle text="Cuéntanos cómo te llamas" />
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputText
                                            placeholder="Primer nombre"
                                            isError={true}
                                        />
                                        <InputText placeholder="Segundo nombre" />
                                    </div>
                                    <Subtitle text="Y tus apellidos, por favor" />
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputText
                                            placeholder="Primer apellido"
                                            isError={true}
                                        />
                                        <InputText placeholder="Segundo apellido" />
                                    </div>
                                    <Subtitle
                                        text="Ahora compártenos tu sexo y edad"
                                        isError={true}
                                    />
                                    <div className="mb-6 grid grid-cols-2 gap-5">
                                        <div>
                                            {/**<Text text="Sexo" /> */}

                                            <SelectGeneral
                                                data={sexoLabels}
                                                placeholder={
                                                    UserMessages.formComplete
                                                        .sex.placeholder
                                                }
                                                optionsLabel={
                                                    UserMessages.formComplete
                                                        .sex.labelOption
                                                }
                                                isError={true}
                                            />
                                        </div>
                                        <div>
                                            {/** <Text text="Edad" /> */}
                                            <SelectGeneral
                                                data={ageGenerator}
                                                placeholder={
                                                    UserMessages.formComplete
                                                        .age.placeholder
                                                }
                                                optionsLabel={
                                                    UserMessages.formComplete
                                                        .age.labelOption
                                                }
                                            />
                                        </div>
                                    </div>

                                    <Button text="Guardar datos básicos" />
                                </form>
                            </article>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default WelcomeUser;
