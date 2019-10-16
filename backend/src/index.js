import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/data/", (req, res) => {
  console.log("what");
  res.send('{"express_status": "working"}');
});

app.get("*", (req, res) => {
  res.send("Express is working.");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
