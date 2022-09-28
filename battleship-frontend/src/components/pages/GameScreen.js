import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "../UI/molecules/Grid";
import { useUserInfo } from '../../customHooks/user-info'
import { userId } from "../../socket_functions";
import '../UI/uiStyles/GameScreen.css'
import { attack, room_message } from "../../socket_functions";
import Button from "../UI/atoms/Button";

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
  const [ messageToSend, setMessageToSend ] = useState('')

  const [ attackedInfo, setAttackedInfo ] = useState()
  const [ countPoints, setCountPoints ] = useState(0)
  const [ loseState, setLoseState ] = useState(false)


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
          break;
        case "attack":
          const attack = user.data.body

          if (attack.hit && turn === id) {
            setCountPoints(countPoints + 1)
          }

          setAttackedInfo(user.data.body)
          break;
        case "lose":
          if (user.data.body.id === id) {
            setLoseState(true)
          }
          break;
        case "room_message":
          appendMessageToField(user.data.body)
          break;
        default:
          console.log("ACCION", user.data)
          break;
      }
    }
  }, [user])

  useEffect(() => {
    if (turn === id) setTurnFinished(false)
  }, [turn])

  const changeTurn = () => {
    setAttacksCounter(0)
    setTurnFinished(true)
}

  const onCellClick = (data) => {
    setAttacksCounter(attacksCounter + 1)
    attack(room, data[1], data[0], playersInfo[userAttacks] && playersInfo[userAttacks].id)
  }

  const handleMessageSend = (event) => {
    setMessageToSend(event.target.value);
  };
  
  const onSendMessage = () => {
    let messageBody = {"data": { "action":"room_message", "body":{messageToSend, "username": myUser.username} }}
    appendMessageToField({messageToSend, "username": myUser.username})
    room_message(messageBody, room)
  }

  const appendMessageToField = (body) => {

    const unMensaje = document.createElement('p')

    const text = document.createTextNode(body.username + ": " + body.messageToSend);
    unMensaje.appendChild(text);

    const containerMsg = document.getElementById("containerMesssages")
    containerMsg.appendChild(unMensaje)
    containerMsg.scrollTo(0, containerMsg.scrollHeight)

  }

  let gridCounter = 0
  return (
    <div>
      <div className="titlesContainer">
        <h2> Your Score {countPoints} </h2>
        <h2> Game Screen </h2>
        <h2> Battle Ship </h2>
      </div>
      <div className="GridContainer">
        {playersInfo.map((element) => {
          gridCounter += 1
          if (element.id === myUser.id) {
            return (
              <div className="OwnGrid">
                <Grid 
                  key={element.id} 
                  userGridId={element.id} 
                  gridPosition={gridCounter} 
                  generatedGrid={grid} 
                  title={"Player " + element.username + " (You)"} 
                  getCell={() => {}}
                  selfDashboard={true}
                  attackedInfo={attackedInfo}
                  stateGrid={loseState}
                />
              </div>
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

            return (
              <div className={
                (playersInfo.indexOf(element) === blockedGrid) ||
                (turnFinished) ||
                (turn !== id) ? "blockedGrid" : ""
              }>
              <Grid 
                key={element.id}
                userGridId={element.id} 
                gridPosition={gridCounter}
                boatsLengths={[]}
                title={"Player " + element.username}
                onCellClick={onCellClick}
                selfDashboard={false}
                stateGrid={loseState}
                attackedInfo={attackedInfo} />
              </div>
            )   
          }
        })}

      </div>
      <div className="chatBackground">
        Chat
        <div id="containerMesssages" className="backgroundMesssages"/>
        <div className="inputContainer">
          <Button renderGrid={onSendMessage} title={"Send"} />
          <input 
            id="message" 
            type="text" 
            name="message"
            className="chatField"
            placeholder="Send a message..."
            onChange={handleMessageSend}
            value={messageToSend}
          />
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
