import React from "react";
import ButtonOption from "../molecules/ButtonOption";

const OptionsMenu = (props) => {
  return (
    <div>
        <ButtonOption title={'Create Game/ Join Game'} buttonTitle={'Create Game/ Join Game'} room={props.room} username={props.username} />
    </div>
  );
}

export default OptionsMenu;
