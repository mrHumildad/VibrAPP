const express = require('express');
const levels = require('./levels')
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const cors = require("cors");

let user = []; // Temporary storage for the single user
let so = { notaBase: 0, numeroDeOctavas: 0, duracion: 0, aroma: "major", mainVol: 0.8, silencios: 0 }; // Initial state

app.use(cors());
app.use(bodyParser.json());

const { registerUser, loginUser } = require('./userController');
const { verifyToken } = require('./authMiddleware');

app.get("/user", (req, res) => {
  res.json({ user, so });
});

app.post("/user", (req, res) => {
  const { inputValue } = req.body;
  console.log(req.body)
   console.log('')
   so = levels[user.length].updateSo(so, inputValue); // Apply update function to `so`
   console.log("Updated User:", user);
   console.log("Updated So:", so);
   user.push(inputValue);
  res.json({ user, so });
});

app.post('/register', registerUser);
app.post('/login', loginUser);

app.get("/level/:index", (req, res) => {
  const index = parseInt(req.params.index, 10); // Get index from request
  console.log('getting data from level ', index)
  if (isNaN(index) || index < 0 || index >= levels.length) {
    return res.status(400).json({ error: "Invalid index" });
  }

  //console.log(levels[index]);
  res.json(levels[index]);
})

// Protected route
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome to the dashboard, ${req.user.username}!` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

