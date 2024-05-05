require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'CEKay383#',
  database: 'mywork',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("All fields are required");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    await pool.execute(query, [username, hashedPassword, email]);
    res.status(201).send("User registered");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).send("Username already exists");
    }
    console.error("Database error:", error);
    res.status(500).send("Error registering user");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

process.on("SIGINT", async () => {
  await pool.end();
  console.log("Database pool closed");
  process.exit();
});
