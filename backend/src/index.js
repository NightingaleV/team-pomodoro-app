import express from "express";
// Import Env Variables
const { parsed, error } = require("dotenv").config({
  path: "../config/dev.env",
  debug: true
});
console.error(error);
// Env Variables parsed to disposal
console.log(parsed);

// Init a Express.js
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/data/", (req, res) => {
  res.send('{"express_status": "working"}');
});

app.get("*", (req, res) => {
  res.send("Express is working.");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
