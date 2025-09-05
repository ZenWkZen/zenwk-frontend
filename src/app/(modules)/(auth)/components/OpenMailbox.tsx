import Label from '@app/app/(modules)/(auth)/ui/Label';
import Paragraph from '@app/shared/ui/Paragraph';
import ButtonOpen from '@app/shared/ui/ButtonOpen';

import { Messages } from '@app/shared/constants/messages';
import { AuthMessages } from '@auth/constants/auth-messages';

/**
 * Componente OpenMailbox: Botones para abrir bandejas de correos.
 *
 * @param isSuccessResend - bandera para el envio del correo.
 * @returns - JSX Component.
 */
const OpenMailbox = ({
    isSuccessResend,
    typeStyle,
}: {
    isSuccessResend: boolean;
    typeStyle?: 'profileConfiguration' | 'default' | 'other';
}) => {
    return (
        <div className="mt-3 w-full text-center sm:w-[400px]">
            {isSuccessResend && (
                <>
                    <Label text={AuthMessages.otp.codeResentSuccess} />
                </>
            )}
            <Paragraph
                text={
                    <ul className="mt-2 flex justify-center space-x-2">
                        <li>
                            <ButtonOpen
                                href="https://mail.google.com"
                                text={Messages.commons.gmail}
                                typeStyle={typeStyle}
                            />
                        </li>
                        <li>
                            <ButtonOpen
                                href="https://outlook.live.com/mail"
                                text={Messages.commons.outlook}
                                typeStyle={typeStyle}
                            />
                        </li>
                        <li>
                            <ButtonOpen
                                href="https://www.icloud.com/mail"
                                text={Messages.commons.iCloud}
                                typeStyle={typeStyle}
                            />
                        </li>
                    </ul>
                }
            />
        </div>
    );
};

export default OpenMailbox;
