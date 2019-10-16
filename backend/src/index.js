import express from "express";
// Import Env Variables
const { parsed, error } = require("dotenv").config({
  path: "../config/.env",
  debug: true
});
console.error(error);
console.log(parsed);

// Init a Express.js
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/data/", (req, res) => {
  console.log("what");
  console.log(process.env.DB_USER);
  res.send('{"express_status": "working"}');
});

app.get("*", (req, res) => {
  res.send("Express is working.");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
