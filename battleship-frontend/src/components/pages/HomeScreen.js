import { useState, useEffect } from 'react'
import OptionsMenu from "../UI/organisms/OptionsMenu";
import '../UI/uiStyles/HomeScreen.css'
import { io } from "socket.io-client";
import { createConnection, joinRoom } from "../../socket_functions";
import { useUserInfo } from '../../customHooks/user-info'

const HomeScreen = () => {
  const [startGame, setStartGame] = useState()
  const [isLoading, setLoading] = useState(false)
  // const [room, setRoom] = useState("")
  const [ grid, setGrid ] = useState([])
  const { user, setUser, room, setRoom } = useUserInfo()
  const getSelectedCell = (data) => {
    console.log('Selected key', data);
  }

  useEffect(() => {
    const socket = io("https://floating-coast-52950.herokuapp.com:8080");
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

  const handleRoomChange = (event) => { 
    setRoom(event.target.value)
  }

  useEffect(() => {
    // console.log("AQUI", user)
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
          <OptionsMenu room={room}/>
        </div>
    </div>
  );
}

export default HomeScreen;
