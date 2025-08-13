"use client";
import { useRouter } from "next/navigation";
import { UserMessages } from "../constants/user-messages";
import { UserStateEnum } from "@user/interfaces/user-dto";
import { ageGenerator } from "@app/shared/utils/userUtils";
import { sexoLabels } from "@app/shared/utils/optionsSexUtils";
import { TEXT_CYAN_COLOR } from "@app/styles/constans-color";
import { useFetchAuthenticatedUser } from "@user/hooks/useFetchAuthenticatedUser";

import Title from "@user/ui/user-feed/Title";
import ButtonCloseWindow from "../ui/Buttons/ButtonCloseWindow";
import Spinner from "@app/shared/ui/Spinner";
import Subtitle from "@user/ui/user-feed/Subtitle";
import InputText from "@user/ui/inputs/InputText";
import Button from "@user/ui/Buttons/Button";
import SelectGeneral from "@user/ui/inputs/SelectGeneral";

/** Componente encargado de consultar el usuario con los datos envidados después del login.
 * Si el jwt ha esxpirado retorna a la pagina del login.
 */
const WelcomeUser = () => {
    const router = useRouter();
    /**
     *  Use efect para recuperar el useJwtContext y consultar el usuario.
     **/
    const { userDTO, loading } = useFetchAuthenticatedUser();
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
                sizeOffset={15}
                text={
                    <div
                        className={`mb-5 inline-block text-center font-light ${TEXT_CYAN_COLOR}`}
                    >
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
                        <div className="max-w-[600px] rounded-xl border border-gray-200 shadow-xl shadow-gray-300">
                            {/** Componetizar potencial "CARD" posible uso en el feed */}
                            <article className="px-12 py-3">
                                {/* Cerrar ventana */}
                                <ButtonCloseWindow
                                    text={
                                        UserMessages.messageToolTip.closeWindow
                                    }
                                    watch={true}
                                />

                                <div className="mt-7 mb-3">
                                    <Title
                                        sizeOffset={-1}
                                        text={
                                            <label
                                                className={`${TEXT_CYAN_COLOR}`}
                                            >
                                                {
                                                    UserMessages.welcome
                                                        .completeRegister
                                                }
                                            </label>
                                        }
                                    />
                                </div>

                                <form className="mx-auto max-w-md">
                                    <Subtitle
                                        text={
                                            UserMessages.formComplete.labelNames
                                        }
                                    />
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputText
                                            placeholder={
                                                UserMessages.formComplete
                                                    .placeholder.firstName
                                            }
                                            isError={true}
                                        />
                                        <InputText
                                            placeholder={
                                                UserMessages.formComplete
                                                    .placeholder.middleName
                                            }
                                        />
                                    </div>
                                    <Subtitle
                                        text={
                                            UserMessages.formComplete
                                                .labelLastNames
                                        }
                                    />
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputText
                                            placeholder={
                                                UserMessages.formComplete
                                                    .placeholder.middleLastName
                                            }
                                            isError={true}
                                        />
                                        <InputText placeholder="Segundo apellido" />
                                    </div>
                                    <Subtitle
                                        text={
                                            UserMessages.formComplete
                                                .labelSexAndAge
                                        }
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

                                    <Button
                                        text={
                                            UserMessages.buttons.welcome
                                                .buttonSave
                                        }
                                    />
                                </form>
                            </article>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default WelcomeUser;
