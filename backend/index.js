const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'courses.json');
let data = require('./courses.json');

// Get all users
app.get('/api/users', (req, res) => {
  res.json(data.users || []);
});

// Get career paths
app.get('/api/career-paths', (req, res) => {
  res.json(data.careerPaths || {});
});

// Update CGPA for a user
app.put('/api/users/:id/cgpa', (req, res) => {
  const userId = parseInt(req.params.id);
  const { cgpa } = req.body;
  const user = data.users.find(u => u.id === userId);
  if (user) {
    user.cgpa = cgpa;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Add new user
app.post('/api/users', (req, res) => {
  const { name, skills, careerGoal, cgpa } = req.body;
  const newUser = {
    id: data.users.length + 1,
    name,
    skills: skills || [],
    careerGoal,
    cgpa: cgpa ? parseFloat(cgpa) : 0
  };
  data.users.push(newUser);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(newUser);
});

app.post("/analyze", async (req, res) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/analyze", req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding to Flask:", error.message);
    res.status(500).json({ error: "Failed to analyze skills" });
  }
});

app.listen(5000, () => {
  console.log("Node.js backend running on http://localhost:5000");
});
