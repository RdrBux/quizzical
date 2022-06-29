import MainScreen from './components/MainScreen';
import StartScreen from './components/StartScreen';
import React, { useState } from 'react';

function App() {
  const [startGame, setStartGame] = useState(false);

  function handleStart() {
    setStartGame(true);
  }

  return (
    <div className="App">
      {startGame ? <MainScreen /> : <StartScreen handleStart={handleStart} />}
    </div>
  );
}

export default App;
