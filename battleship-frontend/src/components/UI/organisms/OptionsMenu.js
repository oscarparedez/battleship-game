import React from "react";
import ButtonOption from "../molecules/ButtonOption";

const OptionsMenu = (props) => {
  return (
    <div>
        <ButtonOption title={'Create Game'} buttonTitle={'Create Game'}  renderGrid={props.renderGridOponent} />
    </div>
  );
}

export default OptionsMenu;
