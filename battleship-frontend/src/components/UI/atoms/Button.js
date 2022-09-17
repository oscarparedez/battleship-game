import React from "react";
import '../uiStyles/Button.css'

const Button = (props) => {
  return (
    <button className='Button' onClick={props.renderGrid}>
        {props.title}
    </button>
  );
}

export default Button;
