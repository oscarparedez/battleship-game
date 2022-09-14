import React, { useState, useEffect } from "react";
import '../uiStyles/Grid.css'
import GridSquare from "../atoms/GridSquare";

const Grid = (props) => {

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
        const boatsLengths = [4, 3, 3, 2, 2]

        for (let i = 0; i <= boatsLengths.length; i++) {
            let flag = generateBoat(boatsLengths[i])
            while (!flag) {
                flag = generateBoat(boatsLengths[i])
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
                    if (grid[yCord][xCord + i] !== 0) {
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
        }
        return true
    }
    

    return (
        <div className="Grid">
            { grid.map((row, index) => (
                <div key={index} className="GridRow">
                    {row.map((cell, index) => (
                       <GridSquare key={index} isBoat={cell === 0 ? false : true} />
                    ))}
                </div>
            )) }
        </div>
    );
}

export default Grid;
