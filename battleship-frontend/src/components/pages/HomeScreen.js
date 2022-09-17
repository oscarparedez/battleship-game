import { Link } from "react-router-dom";
import { useState } from 'react'
import Grid from "../UI/molecules/Grid";
import OptionsMenu from "../UI/organisms/OptionsMenu";
import '../UI/uiStyles/HomeScreen.css'

const HomeScreen = () => {
  const [startGame, setStartGame] = useState()
  const getSelectedCell = (data) => {
    console.log('Selected key', data);
  }

  return (
    <div>
        <OptionsMenu renderGridOponent={() => setStartGame(true)}/>

        {startGame && (
          <div className="GridsOfPlayers">
            <Grid boatsLengths={[4, 3, 3, 2, 2]} title="Player One" getCell={null} selfDashboard={true} />
            <Grid boatsLengths={[]} title="Player Two" getCell={getSelectedCell} selfDashboard={false} />
            <Grid boatsLengths={[]} title="Player Three"  getCell={getSelectedCell} selfDashboard={false}/>
          </div>
        )}
    </div>
  );
}

export default HomeScreen;
