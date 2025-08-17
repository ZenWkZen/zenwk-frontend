"use client";
import { useRouter } from "next/navigation";
import { UserMessages } from "../constants/user-messages";
import { UserStateEnum } from "@user/interfaces/user-dto";
import { ageGenerator } from "@app/shared/utils/userUtils";
import { sexoLabels } from "@app/shared/utils/optionsSexUtils";
import {
    TEXT_CYAN_COLOR,
    TEXT_CYAN_CUSTOM,
    TEXT_VIOLET_REDDISH,
} from "@app/styles/constans-color";
import { useFetchAuthenticatedUser } from "@user/hooks/useFetchAuthenticatedUser";

import Title from "@user/ui/user-feed/Title";
import ButtonCloseWindow from "@user/ui/buttons/ButtonCloseWindow";
import Spinner from "@app/shared/ui/Spinner";
import Subtitle from "@user/ui/user-feed/Subtitle";
import InputText from "@user/ui/inputs/InputText";
import Button from "@app/app/(modules)/user/ui/buttons/Button";
import SelectGeneral from "@user/ui/inputs/SelectGeneral";
import Text from "@user/ui/user-feed/Text";

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
                sizeOffset={0}
                text={
                    <div
                        className={`mb-5 inline-block text-center ${TEXT_CYAN_COLOR} font-[300] tracking-tight`}
                    >
                        {UserMessages.welcome.title}
                        <label className="font-medium">
                            {userDTO?.username}
                        </label>
                        {UserMessages.welcome.subtitle}
                    </div>
                }
            />

            {/** Formulario para completar los datos personales */}
            <div className="grid place-items-center">
                {userDTO != undefined &&
                    userDTO.state === UserStateEnum.INCOMPLETE_PERFIL && (
                        <div className="rounded-xl bg-white shadow-xl shadow-gray-300 transition-all duration-200">
                            {/** Componetizar potencial "CARD" posible uso en el feed */}
                            <article className="px-12">
                                {/* Se deshabilita: cerrar ventana: UserMessages.messageToolTip.closeWindow*/}
                                {/** Titulo ventana */}
                                <div className="mt-4">
                                    <Text
                                        sizeOffset={4}
                                        text={
                                            UserMessages.welcome
                                                .completeRegister
                                        }
                                        className={`font-normal ${TEXT_CYAN_COLOR}`}
                                    />
                                </div>
                                {/** Formulario */}
                                <form className="mx-auto max-w-md">
                                    <Subtitle
                                        sizeOffset={0}
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
