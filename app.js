require("dotenv").config();
require("isomorphic-fetch");
const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const flagRoutes = require("./routes/flagRoutes");

const app = express();
app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

const rateLimitStore = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;

function rateLimiter(req, res, next) {
  const ip = req.ip || req.socket?.remoteAddress || "unknown";
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.start > WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, start: now });
    return next();
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({ error: "Too many requests, please try again later." });
  }
  return next();
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "✅ CS8 Kemjar Backend API is running!",
  });
});

app.use("/users", rateLimiter, userRoutes);
app.use("/flags", rateLimiter, flagRoutes);

app.use((err, req, res, next) => {
  return res.status(400).json({ error: "Bad request" });
});

const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
