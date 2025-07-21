import React from "react";

interface Props {
  title: string;
}

/**
 * @abstract Componente a nivel de paginas que los titulos de sección.
 * @param title
 * @returns
 */
const Title = ({ title }: Props) => {
  return <h1 className="text-center my-5 text-3xl text-gray-700">{title}</h1>;
};

export default Title;
