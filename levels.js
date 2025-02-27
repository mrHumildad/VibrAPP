const levels = [
  {
    text: "How do you feel today?",
    inputCfg: {
      id: "mood",
      type: "select",
      options: ["Happy", "Calm", "Sad", "Angry"]
    },
    barDuration: 10,
    initValue: 'Happy',
    updateSo: function (so, value) {
      console.log(so)
      console.log(value)
      const moodMap = { Happy: 6, Calm: 4, Sad: 3, Angry: 2 };
      so.numNubes = moodMap[value] || 4;
      return so;
    }
  },
  {
    text: "Your **name** carries a vibrational frequency. We convert it into a numerical value to adjust the base note of the sound.",
    inputCfg: {
      id: "name",
      type: "text",
      placeholder: "Enter your name"
    },
    barDuration: 10,
    initValue: '',
    updateSo: function (so, value) {
      console.log(so)
      console.log(value)
      let nameValue = [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
      so.notaBase = 10 + (nameValue % 63);
      console.log(so)
      return so;
    }
  },
  {
    text: "Select a frequency for your sound healing.",
    inputCfg: {
      id: "frequency",
      type: "range",
      placeholder: "Enter frequency (Hz)",
      min: 20,
      max: 20000,
      step: 1
    },
    barDuration: 10,
    initValue: 1312,
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
    barDuration: 10,
    initValue: '#454578',
    updateSo: function (so, value) {
      so.aroma = value;
      return so;
    }
  },
  {
    text: "Set the duration of your session.",
    inputCfg: {
      id: "duration",
      type: "range",
      placeholder: "Enter duration (minutes)",
      min: 5,
      max: 20,
      step: 1
    },
    barDuration: 10,
    initValue: 13,
    updateSo: function (so, value) {
      so.duracion = parseInt(value) || 10;
      return so;
    }
  },
  
];

module.exports = levels