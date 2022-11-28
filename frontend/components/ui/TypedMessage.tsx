import React from "react";
import Typed from "react-typed";

type TypedMessageProps = {
  titles: string[];
};

const TypedMessage = ({ titles }: TypedMessageProps) => {
  return (
    <>
      <Typed strings={titles} typeSpeed={40} backSpeed={50}></Typed>
    </>
  );
};

export default TypedMessage;
