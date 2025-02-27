//import React from 'react';

const PlayButt = ({user, wellcome, barPlay, setUser, setBarPlay, setWellcome, setShowComponent, handleSubmit}) => {
  const playClick = () => {
    console.log('playclick')
    if (wellcome) {
      setWellcome(false);
    } else {
      handleSubmit();
    }
    setShowComponent(false);
    setBarPlay(true);
  }
  return (
    <div 
      id="playButt" 
      onClick={barPlay ? null : playClick} // Prevent clicks when barPlay is true
      className={barPlay ? "disabled" : ""} // Add a class to visually indicate it's disabled
    >
      <span id="logo">((-))</span>
    </div>
  );
}

export default PlayButt;
