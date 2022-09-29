import { useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/atoms/Button";

const EndGameScreen = (props) => {
  const location = useLocation()
  const navigate = useNavigate()

  const { gameStatus } = location.state

  const onPlayAgain = () => {
    navigate("/")
  }
    return (
      <div>
          {gameStatus ? 
          <div>
            <h1>Game Over</h1>
            <h2>Congratulations You Won!</h2>
          </div>
           :
          <div>
            <h1>Game Over</h1>
            <h2>Good luck in next game!</h2>
          </div>
           }
          <Button renderGrid={onPlayAgain} title={"Play Again"} />
      </div>
    );
  }
  
  export default EndGameScreen;
  