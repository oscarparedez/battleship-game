import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "../UI/molecules/Grid";
import { useUserInfo } from '../../customHooks/user-info'
import { userId } from "../../socket_functions";
import '../UI/uiStyles/GameScreen.css'
import { attack } from "../../socket_functions";

const PLAYER0 = [1, 2]
const PLAYER1 = [0, 2]
const PLAYER2 = [0, 1]

const GameScreen = (props) => {
  const location = useLocation()
  const { user, playersInfo, room } = useUserInfo()
  const {id} = userId()
  const { grid } = location.state

  const [turn, setTurn] = useState()

  const myUser = playersInfo.find(userData => userData.id === id)
  const userPosition = playersInfo.indexOf(myUser)

  const [userAttacks, setUserAttacks] = useState()
  const [ attacksCounter, setAttacksCounter ] = useState(0)

  const [ turnFinished, setTurnFinished ] = useState(false)
  const  [ cellAttacked, setCellAttacked ] = useState([])

  useEffect(() => {
    if (userPosition === 0 && attacksCounter === 0) {
      setUserAttacks(PLAYER0[0])
    } else if(userPosition === 0 && attacksCounter === 1) {
      setUserAttacks(PLAYER0[1])
    } else if(userPosition === 1 && attacksCounter === 0) {
      setUserAttacks(PLAYER1[0])
    } else if(userPosition === 1 && attacksCounter === 1) {
      setUserAttacks(PLAYER1[1])
    } else if(userPosition === 2 && attacksCounter === 0) {
      setUserAttacks(PLAYER2[0])
    } else if(userPosition === 2 && attacksCounter === 1) {
      setUserAttacks(PLAYER2[1])
    }

    if (attacksCounter === 2) {
      console.log("CHANGE TURN")
      changeTurn()
    }
  }, [userPosition, attacksCounter])

  useEffect(() => {
    if (user) {
      switch (user.data.action) {
        case "turn":
          setTurn(user.data.body.id)
          console.log("TURNO", playersInfo, user.data)
          break;
        default:
            // console.log("HERE1")
            console.log("ACCION", user.data)
          break;
      }
    }
  }, [user])

  const changeTurn = () => {
    setAttacksCounter(0)
    setTurnFinished(true)
  }

  const onCellClick = (data) => {
    setAttacksCounter(attacksCounter + 1)
    console.log('celllllllllllll', data)
    attack(room, data[1], data[0], playersInfo[userAttacks] && playersInfo[userAttacks].id)
  }

  let gridCounter = 0
  return (
    <div>
      <h2>Game Screen</h2>
      {playersInfo.map((element) => {
        gridCounter += 1
        if (element.id === myUser.id) {
          return (
            <Grid 
              key={element.id} 
              gridPosition={gridCounter} 
              generatedGrid={grid} 
              title={"Player " + userPosition + element.id + " (You)"} 
              getCell={() => {}}
              selfDashboard={true}
            />
          )
        } else {
          let blockedGrid = 0
          if (userPosition === 0) {
            if (userAttacks === 1) {
              blockedGrid = 2
            }
            else if (userAttacks === 2) {
              blockedGrid = 1
            }
          }
          else if (userPosition === 1) {
            if (userAttacks === 0) {
              blockedGrid = 2
            }
            else if (userAttacks === 2) {
              blockedGrid = 0
            }
          }
          else if (userPosition === 2) {
            if (userAttacks === 0) {
              blockedGrid = 1
            }
            else if (userAttacks === 1) {
              blockedGrid = 0
            }
          }

          console.log((playersInfo.indexOf(element) === blockedGrid), turnFinished, (turn !== userPosition), turn, userPosition)

          return (
            <div className={
              (playersInfo.indexOf(element) === blockedGrid) ||
              (turnFinished) ||
              (turn !== id) ? "blockedGrid" : ""
            }>
            <Grid 
              key={element.id}
              gridPosition={gridCounter}
              boatsLengths={[]}
              title={"Player " + element.id}
              onCellClick={onCellClick}
              selfDashboard={false} />
            </div>
          )   
        }
      })}
    </div>
  );
}

export default GameScreen;
