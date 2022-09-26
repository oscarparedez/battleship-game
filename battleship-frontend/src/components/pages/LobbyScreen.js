import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import Grid from "../UI/molecules/Grid";
import { io } from "socket.io-client";
import { createConnection, joinRoom } from "../../socket_functions";
import { useUserInfo } from '../../customHooks/user-info'

const LobbyScreen = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { room } = location.state
  const [startGame, setStartGame] = useState()
  const [ grid, setGrid ] = useState([])
  const { user, setUser, playersInfo, setPlayersInfo } = useUserInfo()
  const getSelectedCell = (data) => {
    console.log('Selected key', data);
  }

  // useEffect(() => {
  //   const socket = io("http://localhost:8080");
  //   createConnection(socket, setUser)
  // }, [])

  const join_room = (roomID, grid) => {
    joinRoom(roomID, grid)
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

  const onGridRendered = (grid) => {
    setGrid(grid)
    const socket = io("http://localhost:8080");
    createConnection(socket, setUser)
    join_room(room, grid)
  }

  return (
    <div>
      <h1>Waiting for other players...</h1>
      <div className="GridsOfPlayers">
          <h4>This will be your grid</h4>
          <Grid onGridRendered={onGridRendered} boatsLengths={[4, 3, 3, 2, 2]} title="Player One" getCell={() => {}} selfDashboard={true} />
          {/* <Grid boatsLengths={[]} title="Player Two" getCell={getSelectedCell} selfDashboard={false} />
          <Grid boatsLengths={[]} title="Player Three"  getCell={getSelectedCell} selfDashboard={false}/> */}
        </div>
    </div>
  );
}

export default LobbyScreen;
