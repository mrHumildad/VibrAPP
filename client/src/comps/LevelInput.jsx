import { useState, useEffect } from "react";

const BarSelector = ({ options, min, max, step, value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value || min);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setInternalValue(newValue);
    onChange(options ? options[newValue] : newValue);
  };

  return (
    <div >
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={options ? options.indexOf(value) : internalValue}
        onChange={handleChange}
      />
    </div>
  );
};

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

  return (
    <div className="centered">
      <div id="text">{levelData?.text || "Loading..."}</div>
      <div id="input">
        {levelData?.inputCfg?.type === "range" || levelData?.inputCfg?.type === "select" ? (
          <BarSelector
            min={levelData?.inputCfg?.min || 0}
            max={
              levelData?.inputCfg?.type === "select"
                ? levelData.inputCfg.options.length - 1
                : levelData?.inputCfg?.max
            }
            step={levelData?.inputCfg?.step || 1}
            value={inputValue}
            options={levelData?.inputCfg?.type === "select" ? levelData.inputCfg.options : null}
            onChange={setInputValue}
          />
        ) : (
          <input
            id={levelData?.inputCfg?.id}
            type={levelData?.inputCfg?.type}
            placeholder={levelData?.inputCfg?.placeholder || ""}
            min={levelData?.inputCfg?.min}
            max={levelData?.inputCfg?.max}
            step={levelData?.inputCfg?.step}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
      </div>
      {levelData.inputCfg.type !== 'text' && <span>{inputValue}</span>}
    </div>
  );
};

export default LevelInput;
