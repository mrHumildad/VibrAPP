const express = require('express');
const path = require('path');
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const session = require("express-session");
const levels = require('./levels')
const bodyParser = require('body-parser');

const app = express();

// Add session middleware
app.use(session({
  secret: 'stocazzo', // Replace with a secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

const dbPath = path.join(__dirname, './users.sqlite'); // Adjust to your actual DB filename
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// Ensure users table exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name TEXT UNIQUE,
  password TEXT
)`);

const PORT = 3000;
const cors = require("cors");
const dataInit = {
  user: [], 
  so: { notaBase: 0, numeroDeOctavas: 0, duracion: 0, aroma: "major", mainVol: 0.8, silencios: 0, numNubes: 8 } // Initial state
}

app.use(cors());
app.use(bodyParser.json());

const { registerUser, loginUser } = require('./userController');
const { verifyToken } = require('./authMiddleware');

app.use(express.static(path.join(__dirname, './client/dist')));

app.get("/user/:user_name", (req, res) => {
  const { user_name } = req.params;

  db.get("SELECT data FROM users WHERE user_name = ?", [user_name], (err, row) => {
    if (err) {
      console.error("DB Error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = JSON.parse(row.data);
    console.log(userData)
    res.json(userData);
  });
});

app.post("/user", (req, res) => {
  const { user_name, inputValue } = req.body;

  if (!user_name || !inputValue) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.get("SELECT data FROM users WHERE user_name = ?", [user_name], (err, row) => {
    if (err) {
      console.error("DB Error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    let userData = JSON.parse(row.data);
    userData.userName = user_name;

    // Apply the level update logic
    userData.so = levels[userData.user.length].updateSo(userData.so, inputValue);
    userData.user.push(inputValue);

    // Save updated data back to DB
    db.run("UPDATE users SET data = ? WHERE user_name = ?", [JSON.stringify(userData), user_name], (err) => {
      if (err) {
        console.error("Update Error:", err.message);
        return res.status(500).json({ error: "Error updating user data" });
      }
      res.json(userData);
    });
  });
});

/* app.post('/register', registerUser);
app.post('/login', loginUser); */

app.post("/register", async (req, res) => {
  const { user_name, password } = req.body;
  if (!user_name || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if the user already exists
    db.get("SELECT * FROM users WHERE user_name = ?", [user_name], (err, row) => {
      if (err) {
        console.error("DB Error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      if (row) {
        return res.status(400).json({ error: "User already exists" });
      }
      const jsonData = JSON.stringify(dataInit || {}); // Convert data to JSON string
      // Insert the new user
      db.run("INSERT INTO users (user_name, password, data) VALUES (?, ?, ?)", [user_name, hashedPassword, jsonData], function (err) {
        if (err) {
          console.error("Insert Error:", err.message);
          return res.status(500).json({ error: "Error inserting user" });
        }
        res.json(dataInit);
      });
    });

  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Login User
app.post("/login", (req, res) => {
  console.log("Login route hit"); // This will log whenever the /login endpoint is accessed

  const { user_name, password } = req.body;
  if (!user_name || !password) return res.status(400).json({ error: "Missing fields" });

  db.get("SELECT * FROM users WHERE user_name = ?", [user_name], async (err, user) => {
    if (err) {
      console.error("DB Error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(user.data)
    req.session.user = user;

    // Assuming user.data contains JSON data that needs to be parsed
    let userData = JSON.parse(user.data);
    userData.user_name = user.user_name;

    console.log("User Data:", userData); // Debugging output

    res.json({ userData });
  });
});


app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

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
  res.json({ message: `Welcome to the dashboard, ${req.user.user_name}!` });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

