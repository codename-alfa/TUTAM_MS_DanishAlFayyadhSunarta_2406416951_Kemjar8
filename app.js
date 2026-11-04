require("dotenv").config();
require('isomorphic-fetch');
const cors = require("cors");

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const flagRoutes = require("./routes/flagRoutes")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "✅ CS8 Kemjar Backend API is running!"
  });
});

app.use("/users", userRoutes);
app.use("/flags", flagRoutes);
const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
