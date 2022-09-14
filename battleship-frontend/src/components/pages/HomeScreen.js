import { Link } from "react-router-dom";
import Grid from "../UI/molecules/Grid";
import OptionsMenu from "../UI/organisms/OptionsMenu";

const HomeScreen = () => {
  return (
    <div>
        <OptionsMenu />
        {/* <Link to={"/about"}>About</Link> */}
        <Grid />
    </div>
  );
}

export default HomeScreen;
