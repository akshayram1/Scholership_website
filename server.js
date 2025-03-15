import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

import express from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // Use promise-based MySQL for better async handling
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;


if (!GOOGLE_API_KEY) {
  console.error("❌ Google API key is missing. Please set GOOGLE_API_KEY in .env file.");
  process.exit(1);
}

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "auth_db",
});


// Test database connection
db.getConnection()
  .then(() => console.log("✅ Connected to MySQL database"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
};

// Signup API
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error during signup:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "User already exists" });
    }
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login API
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const [results] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ message: "Database error" });
  }
});

// Chatbot API endpoint
app.post("/api/chat", async (req, res) => {
  console.log("🔑 Google API Key:", GOOGLE_API_KEY ? "Loaded" : "Not Loaded");

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Send the message to Gemini AI
    const result = await model.generateContent({ contents: [{ parts: [{ text: message }] }] });

    // Ensure the response is correctly extracted
    const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

    res.json({ message: text });
  } catch (error) {
    console.error("❌ Error in chatbot API:", error);
    res.status(500).json({ message: "I'm sorry, I couldn't process your request. Please try again later." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
