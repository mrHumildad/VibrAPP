const levels = [
  {
    text: "Your **name** carries a vibrational frequency. We convert it into a numerical value to adjust the base note of the sound.",
    inputCfg: {
      id: "name",
      type: "text",
      placeholder: "Enter your name"
    },
    updateSo: function (so, value) {
      let nameValue = [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
      so.notaBase = 10 + (nameValue % 63);
      return so;
    }
  },
  {
    text: "Select a frequency for your sound healing.",
    inputCfg: {
      id: "frequency",
      type: "number",
      placeholder: "Enter frequency (Hz)",
      min: 20,
      max: 20000,
      step: 1
    },
    updateSo: function (so, value) {
      so.notaBase = parseFloat(value) || 440;
      return so;
    }
  },
  {
    text: "Choose your favorite color to personalize the experience.",
    inputCfg: {
      id: "color",
      type: "color"
    },
    updateSo: function (so, value) {
      so.aroma = value;
      return so;
    }
  },
  {
    text: "Set the duration of your session.",
    inputCfg: {
      id: "duration",
      type: "number",
      placeholder: "Enter duration (minutes)",
      min: 5,
      max: 20,
      step: 1
    },
    updateSo: function (so, value) {
      so.duracion = parseInt(value) || 10;
    }
  },
  {
    text: "How do you feel today?",
    inputCfg: {
      id: "mood",
      type: "select",
      options: ["Happy", "Calm", "Sad", "Angry"]
    },
    updateSo: function (so, value) {
      const moodMap = { Happy: 6, Calm: 4, Sad: 3, Angry: 2 };
      so.numNubes = moodMap[value] || 4;
    }
  }
];

module.exports = levels