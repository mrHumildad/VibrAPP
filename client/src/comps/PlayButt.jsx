//import { creaArr } from "../SOUND/lluvia";
const PlayButt = ({so, user, wellcome, barPlay, setUser, setBarPlay, setWellcome, setShowComponent, handleSubmit}) => {
  const playClick = () => {
    console.log('playclick')
    if (wellcome) {
      setWellcome(false);
      console.log('*************initsound: ', so);
      //creaArr(so);
    } else {
      handleSubmit();
    }
    setShowComponent(false);
    setBarPlay(true);
  }
  const test = () => console.log('test disabled');
  return (
    <div 
      id="playButt" 
      onClick={barPlay ? test : playClick} // Prevent clicks when barPlay is true
      className={barPlay ? "disabled" : ""} // Add a class to visually indicate it's disabled
    >
      <span id="logo">((-))</span>
    </div>
  );
}

export default PlayButt;
