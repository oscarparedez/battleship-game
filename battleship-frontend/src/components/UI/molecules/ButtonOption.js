import React from "react";
import Button from "../atoms/Button";
import Title from "../atoms/Title";

const ButtonOption = (props) => {
  return (
    <div>
        <Title title={props.title} />
        <Button title={props.buttonTitle} />
    </div>
  );
}

export default ButtonOption;
