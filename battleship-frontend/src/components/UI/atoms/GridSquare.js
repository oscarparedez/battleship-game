import React from "react";
import '../uiStyles/GridSquare.css'

const GridSquare = (props) => {
  // console.log("PROPS IS BOAT", props.isBoat, props.positionInGrid)

  const getPositionValue = (event) => {

    if(props.selfDashboard === false) {
      event.currentTarget.classList.add('GridSquareClicked')
    }

    return props.getPositionOnGrid(props.positionInGrid)
  }
  
  return (
    <div className={props.isBoat === true ? "GridBoat" : "GridSquare"} onClick={getPositionValue} >
    </div>
  );
}

export default GridSquare;
