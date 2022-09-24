import { useState, useEffect } from 'react'
import Grid from "../UI/molecules/Grid";
import OptionsMenu from "../UI/organisms/OptionsMenu";
import '../UI/uiStyles/HomeScreen.css'
import { io } from "socket.io-client";
import { createConnection, joinRoom } from "../../socket_functions";
import { useUserInfo } from '../../customHooks/user-info'

const HomeScreen = () => {
  const [startGame, setStartGame] = useState()
  const [isLoading, setLoading] = useState(false)
  const [room, setRoom] = useState("")
  const { user, setUser } = useUserInfo()
  const getSelectedCell = (data) => {
    console.log('Selected key', data);
  }

  useEffect(() => {
    const socket = io("http://localhost:8080");
    createConnection(socket, setUser)
  }, [])

  const join_room = (roomID) => {
    joinRoom(roomID, [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
    setLoading(true)
  }

  const handleRoomChange = (event) => { setRoom(event.target.value) }

  useEffect(() => {
    console.log("AQUI", user)
    if (user) {
      switch (user.data.action) {
        case "room_ready":
            setStartGame(true)
            setLoading(false)
          break;
        case "room_error":
            setLoading(false)
            console.log("ACCION", user.data.body)
          break;
        default:
            console.log("ACCION", user.data)
          break;
      }
    }
  }, [user])

  return (
    <div>
        <div>
          <input type="text" value={room} onChange={handleRoomChange}></input>
          <OptionsMenu renderGridOponent={() => join_room(room)}/>
        </div>
        {isLoading && <h1>LOADING...</h1>}
        {startGame && (
          <div className="GridsOfPlayers">
            <Grid boatsLengths={[4, 3, 3, 2, 2]} title="Player One" getCell={() => {}} selfDashboard={true} />
            <Grid boatsLengths={[]} title="Player Two" getCell={getSelectedCell} selfDashboard={false} />
            <Grid boatsLengths={[]} title="Player Three"  getCell={getSelectedCell} selfDashboard={false}/>
          </div>
        )}
    </div>
  );
}

export default HomeScreen;
