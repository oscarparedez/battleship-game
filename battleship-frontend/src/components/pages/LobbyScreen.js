import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import Grid from "../UI/molecules/Grid";
import { io } from "socket.io-client";
import { createConnection, joinRoom } from "../../socket_functions";
import { useUserInfo } from '../../customHooks/user-info'

const LobbyScreen = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { room, username } = location.state
  const [ grid, setGrid ] = useState([])
  const { user, setUser, setPlayersInfo } = useUserInfo()

  const join_room = (roomID, grid, username) => {
    joinRoom(roomID, grid, username)
  }

  const onGridRendered = (grid) => {
    setGrid(grid)
    const socket = io("https://floating-coast-52950.herokuapp.com/");
    /* const socket = io("http://localhost:5005"); */
    createConnection(socket, setUser)
    join_room(room, grid, username)
  }

  useEffect(() => {
    if (user) {
      switch (user.data.action) {
        case "room_ready":
            console.log('READY, START GAME')
            setPlayersInfo(user.data.body.users)
            navigate("/game", { state: {grid: grid}})
          break;
        case "room_error":
          console.log("HERE")
            // console.log("ACCION", user.data.body)
          break;
        case "turn":
          console.log("TURNO", user.data)
          break;
        default:
            // console.log("HERE1")
            console.log("ACCION", user.data)
          break;
      }
    }
  }, [user])

  return (
    <div>
      <h1>Waiting for other players...</h1>
      <div className="GridsOfPlayers">
          <h4>This will be your grid</h4>
          <Grid onGridRendered={onGridRendered} boatsLengths={[4, 3, 3, 2, 2]} getCell={() => {}} selfDashboard={true} />
        </div>
    </div>
  );
}

export default LobbyScreen;
