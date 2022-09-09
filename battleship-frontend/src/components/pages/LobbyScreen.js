import { Link } from "react-router-dom";

const LobbyScreen = () => {
  return (
    <div>
        <h1>LobbyScreen</h1>
        <Link to={"/about"}>About</Link>
    </div>
  );
}

export default LobbyScreen;
