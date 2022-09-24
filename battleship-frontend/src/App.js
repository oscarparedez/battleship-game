import './App.css';
import { Routes, Route } from "react-router-dom";
import HomeScreen from './components/pages/HomeScreen';
import LobbyScreen from './components/pages/LobbyScreen';
import GameScreen from './components/pages/GameScreen';
import EndGameScreen from './components/pages/EndGameScreen';
import { UserProvider } from './customHooks/user-info'

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/lobby" element={<LobbyScreen />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/end-game" element={<EndGameScreen />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
