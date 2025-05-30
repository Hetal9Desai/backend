const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;


let data;
try {
  data = require("./db.json");
} catch (err) {
  console.error("Failed to load db.json:", err);
  data = { users: [], products: [] };
}


const whitelist = [
  "https://gentle-kitten-718666.netlify.app", 
  "http://localhost:3000"                     
];


const corsOptions = {
  origin(origin, callback) {
    console.log("Request Origin:", origin);
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};


app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 
app.use(express.json());


app.get("/users", (req, res) => {
  try {
    res.json(data.users);
  } catch (err) {
    console.error("Error in /users route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products", (req, res) => {
  try {
    res.json(data.products);
  } catch (err) {
    console.error("Error in /products route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
