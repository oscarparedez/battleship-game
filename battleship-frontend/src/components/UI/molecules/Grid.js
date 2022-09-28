import React, { useState, useEffect } from "react";
import '../uiStyles/Grid.css'
import GridSquare from "../atoms/GridSquare";

const Grid = (props) => {

    const { boatsLengths, userGridId, attackedInfo, stateGrid } = props
    
    const [ grid, setGrid ] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ])

    useEffect(() => {
        if (attackedInfo) {
            if (userGridId === attackedInfo.userid) {
                const tempGrid = [...grid]
                if (attackedInfo.hit) {
                    tempGrid[attackedInfo.position_x][attackedInfo.position_y] = 2
                } else {
                    tempGrid[attackedInfo.position_x][attackedInfo.position_y] = 3
                }
                setGrid(tempGrid)
            }
        }
    }, [userGridId, attackedInfo])

    useEffect(() => {

        if (props.generatedGrid) {
            setGrid(props.generatedGrid)
        } else {
            for (const boatLength of boatsLengths) {
                let flag = generateBoat(boatLength)
                while (!flag) {
                    flag = generateBoat(boatLength)
                } 
            }
            if (props.onGridRendered) {
                props.onGridRendered(grid)
            }
        }

    }, [])


    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const generateBoat = (boatLength) => {

        let xCord = randomIntFromInterval(0, 9)
        let yCord = randomIntFromInterval(0, 9)
        // 0 is horizontal, 1 is vertical
        let boatPosition = randomIntFromInterval(0, 1)

        if (grid[yCord][xCord] === 0) {
            if (boatPosition === 0) {
                for (let i = 0; i < boatLength; i++) {
                    if ((xCord + i) >= 10 || grid[yCord][xCord + i] !== 0) {
                        return false
                    }
                }
                for (let i = 0; i < boatLength; i++) {
                    let tempGrid = [...grid]
                    tempGrid[yCord][xCord + i] = 1

                    setGrid(tempGrid)
                }
            } else {
                for (let i = 0; i < boatLength; i++) {
                    if (!grid[yCord + i] || grid[yCord + i][xCord] !== 0) {
                        return false
                    }
                }
                for (let i = 0; i < boatLength; i++) {
                    let tempGrid = [...grid]
                    tempGrid[yCord + i][xCord] = 1

                    setGrid(tempGrid)
                }                
            }
        } else {
            return false
        }
        return true
    }
    
    return (
        <div className={stateGrid ? "GridBlocked" : "Grid"}>
            <div>
                {props.title} --- {props.gridPosition}
            </div>
            { grid.map((row, rindex) => (
                <div key={rindex} className="GridRow">
                    {row.map((cell, cindex) => (
                       <GridSquare
                            key={cindex}
                            squareType={cell}
                            positionInGrid={[rindex,cindex]}
                            selfDashboard={props.selfDashboard}
                            onCellClick={props.onCellClick}
                            isLobbyScreen={props.isLobbyScreen}
                        />
                    ))}
                </div>
            )) }
        </div>
    );
}

export default Grid;
