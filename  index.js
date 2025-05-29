const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const data = require("./data.json"); // or paste the users/products directly here

app.get("/users", (req, res) => {
  res.json(data.users);
});

app.get("/products", (req, res) => {
  res.json(data.products);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
