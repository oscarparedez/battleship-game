import React from "react";
import ButtonOption from "../molecules/ButtonOption";

const OptionsMenu = (props) => {
  return (
    <div>
        <ButtonOption title={'Create Game'} buttonTitle={'Create Game'} />
        <ButtonOption title={'Join a Game'} buttonTitle={'Join a Game'} />
    </div>
  );
}

export default OptionsMenu;
