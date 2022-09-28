import { useState, useEffect } from 'react'
import OptionsMenu from "../UI/organisms/OptionsMenu";
import '../UI/uiStyles/HomeScreen.css'
import { useUserInfo } from '../../customHooks/user-info'

const HomeScreen = () => {
  const { room, setRoom } = useUserInfo()

  const handleRoomChange = (event) => { 
    setRoom(event.target.value)
  }

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
