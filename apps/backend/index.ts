import express from "express";

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("hi");
});
app.listen(PORT, () => {
  console.log(`running port 3000 ${PORT}`);
});
