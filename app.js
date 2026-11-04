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

app.use("/users", userRoutes);
app.use("/flags", flagRoutes);

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
