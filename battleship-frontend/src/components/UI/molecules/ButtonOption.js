import React from "react";
import { Link } from 'react-router-dom';
import Title from "../atoms/Title";

const ButtonOption = (props) => {
  return (
    <div>
        <Title title={props.title} />
        <Link
          to={'/lobby'}
          state={{
            room: props.room
          }}
          onClick={props.renderGrid}>
            {props.buttonTitle}
        </Link>
    </div>
  );
}

export default ButtonOption;
