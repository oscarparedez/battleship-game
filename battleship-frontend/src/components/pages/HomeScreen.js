import { useState } from 'react'
import OptionsMenu from "../UI/organisms/OptionsMenu";
import '../UI/uiStyles/HomeScreen.css'
import { useUserInfo } from '../../customHooks/user-info'
import CustomModal from '../UI/atoms/CustomModal';

const HomeScreen = () => {
  const { room, setRoom } = useUserInfo()
  const [ username, setUsername ] = useState("")
  const [ toggleModal, setToggleModal ] = useState(false)

  const handleRoomChange = (event) => { 
    setRoom(event.target.value)
  }

  const handleUserChange = (event) => { 
    setUsername(event.target.value)
  }

  const toggleModalVisibility = () => {
      setToggleModal(!toggleModal)
  }


  return (
    <div>
        <div>
          <h1>username</h1>
          <input type="text" value={username} onChange={handleUserChange}></input>
          <br></br>
          <h1>room</h1>
          <input type="text" value={room} onChange={handleRoomChange}></input>
          <OptionsMenu room={room} username={username}/>
        </div>
        <div className='Modal'>
          <button onClick={toggleModalVisibility} className={"InstructionsButton"}>Instructions</button>
          <CustomModal toggleModal={toggleModal} setToggleModal={setToggleModal} toggleModalVisibility={toggleModalVisibility} />
        </div>
    </div>
  );
}

export default HomeScreen;
