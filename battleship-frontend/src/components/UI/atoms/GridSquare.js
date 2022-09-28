import React, { useState } from "react";
import '../uiStyles/GridSquare.css'

const GridSquare = (props) => {
  const {squareType} = props
  const [squareClicked, setSquareClicked] = useState(false)

  const squareClick = () => {
    if (!squareClicked && !props.isLobbyScreen) {
      props.onCellClick(props.positionInGrid)
      setSquareClicked(true)    
    }
  }

  const defineSquare = (type) => {
    let squareType = ''
    switch (type) {
      case 0:
        squareType = "GridSquare"
        break
      case 1:
        squareType = "GridBoat"
        break
      case 2:
          squareType = "DeadBoat"
          break
      case 3:
        squareType = "EmptySquare"
        break
      default:
        break;
    }
    return squareType
  }
  
  return (
    <div
      className={defineSquare(squareType)} 
      onClick={() => squareClick()}>
    </div>
  );
}

export default GridSquare;
