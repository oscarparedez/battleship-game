import './App.css';
import { Routes, Route } from "react-router-dom";
import HomeScreen from './components/pages/HomeScreen';
import LobbyScreen from './components/pages/LobbyScreen';
import GameScreen from './components/pages/GameScreen';
import EndGameScreen from './components/pages/EndGameScreen';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/eng-game" element={<EndGameScreen />} />
      </Routes>
    </div>
  );
}

export default App;
