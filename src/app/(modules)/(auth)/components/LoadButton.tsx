import React from "react";
import Button from "@app/shared/components/Button";
import ButtonLoading from "@app/shared/components/ButtonLoading";

/**
 * Interface que representa los datos para LoadButttonLoading
 */
interface Props {
    textButton: string;
    textLoading?: string;
    loading: boolean;
}
/**
 * Componente LoadButttonLoading para la carga del buton.
 * @returns
 */
const LoadButton = React.memo(({ textButton, textLoading, loading }: Props) => {
    return loading ? (
        <ButtonLoading text={textLoading ? textLoading : textButton} />
    ) : (
        <Button type="submit" text={textButton} />
    );
});

export default LoadButton;
