const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const data = require("./db.json");

const whitelist = [
  "https://lucky-arithmetic-f32e7f.netlify.app", 
  "http://localhost:3000"                          
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/users", (req, res) => res.json(data.users));
app.get("/products", (req, res) => res.json(data.products));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
