import React from "react";
import ButtonOption from "../molecules/ButtonOption";

const OptionsMenu = (props) => {
  return (
    <div>
        <ButtonOption title={'Create Game'} buttonTitle={'Create Game'}  renderGrid={props.renderGridOponent} />
        <ButtonOption title={'Join a Game'} buttonTitle={'Join a Game'}  renderGrid={props.renderGridOponent} />
    </div>
  );
}

export default OptionsMenu;
