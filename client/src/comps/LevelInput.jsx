import { useState, useEffect } from "react";

const LevelInput = ({ actualLevel, inputValue, setInputValue }) => {
  const [levelData, setLevelData] = useState(null);

  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/level/${actualLevel}`);
        const data = await response.json();
        setLevelData(data);
      } catch (error) {
        console.error("Error fetching level data:", error);
      }
    };

    fetchLevelData();
  }, [actualLevel]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="centered">
      <div id="text">{levelData?.text || "Loading..."}</div>
      <div id="input">
        {levelData?.inputCfg?.type === "select" ? (
          <select id={levelData.inputCfg.id} value={inputValue} onChange={handleInputChange}>
            {levelData.inputCfg.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={levelData?.inputCfg?.id}
            type={levelData?.inputCfg?.type}
            placeholder={levelData?.inputCfg?.placeholder || ""}
            min={levelData?.inputCfg?.min}
            max={levelData?.inputCfg?.max}
            step={levelData?.inputCfg?.step}
            value={inputValue}
            onChange={handleInputChange}
          />
        )}
      </div>
      <p>Current Input: {inputValue}</p>
    </div>
  );
};

export default LevelInput;
