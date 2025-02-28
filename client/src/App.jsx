import { useState, useCallback, useEffect } from 'react'

import PlayButt from './comps/PlayButt';
import UserLogs from './comps/UserLogs';
import ProgressBar from './comps/ProgressBar';
import LevelInput from './comps/LevelInput';
import Wellcome from './comps/Wellcome';

import updateSound from './SOUND/sound';

import './App.css'

function App() {
  const [user, setUser] = useState([]);
  const [barPlay, setBarPlay] = useState(true);
  const [wellcome, setWellcome] = useState(true);
  const [showComponent, setShowComponent] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [so, setSo] = useState({ 
    notaBase: 0, numeroDeOctavas: 0, duracion: 0, aroma: "major", mainVol: 0.8, silencios: 0, numNubes: 8 
  });

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log("Fetched User Data:", data);
        setUser(data.user);
        setSo(data.so);
      })
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  const handleSubmit = async () => {
    if (!inputValue || inputValue === '')
      return console.log('problem with inputvalue', inputValue)
    try {
      console.log('inputvalue', inputValue)
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({inputValue}),
      });
      const data = await response.json();
      console.log("Updated data from server:", data);
      setInputValue('');
      setSo(data.so);
      setUser(data.user);
      updateSound(so);
      //updateState(data.user, data.so); // Update user and so state in parent component!!!!
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleBarStop = useCallback(() => {
    console.log("Progress bar animation completed!");
    setBarPlay(false);
    setShowComponent(true);
  }, []);

  return (
    <div className='screen' id='game' >

      {!wellcome && <UserLogs user={user}/>}

      {/* <MiCanvas user={user} /> */}

      {showComponent && (
      wellcome ? (
        <Wellcome actualLevel={user.length} />
      ) : (
        <LevelInput
          actualLevel={user.length}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )
    )}
      <PlayButt
        user={user}
        setUser={setUser} 
        setBarPlay={setBarPlay} 
        setShowComponent={setShowComponent}
        wellcome={wellcome}
        so={so}
        setWellcome={setWellcome}
        handleSubmit={handleSubmit}
         />
      <ProgressBar barPlay={barPlay} barStop={handleBarStop} />
    </div>
  )
}

export default App
