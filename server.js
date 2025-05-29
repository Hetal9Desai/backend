const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const data = require("./db.json");

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(data.users);
});

app.get("/products", (req, res) => {
  res.json(data.products);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
