import React from "react";
import { Link } from 'react-router-dom';
import Title from "../atoms/Title";
import '../uiStyles/Button.css'

const ButtonOption = (props) => {
  return (
    <div className='containerOptions'>
        <Title title={props.title} />
        <Link
          to={'/lobby'}
          state={{
            room: props.room,
            username: props.username
          }}
          className="HomeButton"
          onClick={props.renderGrid}>
            {props.buttonTitle}
        </Link>
    </div>
  );
}

export default ButtonOption;
