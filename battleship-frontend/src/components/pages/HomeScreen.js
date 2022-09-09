import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div>
        <h1>HomeScreen</h1>
        <Link to={"/about"}>About</Link>
    </div>
  );
}

export default HomeScreen;
