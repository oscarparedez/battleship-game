import React from "react";
import '../uiStyles/GridSquare.css'

const GridSquare = (props) => {
  console.log("PROPS IS BOAT", props.isBoat)
  return (
    <div className={props.isBoat === true ? "GridBoat" : "GridSquare"}>
    </div>
  );
}

export default GridSquare;
