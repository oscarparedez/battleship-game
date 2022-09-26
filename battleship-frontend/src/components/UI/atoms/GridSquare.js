import React, { useState } from "react";
import '../uiStyles/GridSquare.css'

const GridSquare = (props) => {
  const [squareClicked, setSquareClicked] = useState(false)

  const squareClick = () => {
    if (!squareClicked) {
      props.onCellClick(props.positionInGrid)
      setSquareClicked(true)    
    }
  }
  
  return (
    <div
      className={
        [props.isBoat === true ? "GridBoat" : "GridSquare", 
        (squareClicked && !props.selfDashboard) ? 'GridSquareClicked' : ''].join(' ')
      } 
      onClick={() => squareClick()}>
    </div>
  );
}

export default GridSquare;
