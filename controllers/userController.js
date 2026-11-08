const User = require("../models/userModels");

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;
const SQL_META_REGEX = /('|--|;|\/\*|\*\/)/;

function isValidCredentials(username, password) {
  if (typeof username !== "string" || typeof password !== "string") return false;
  const cleanUser = username.trim();
  if (!USERNAME_REGEX.test(cleanUser)) return false;
  if (password.length < 3 || password.length > 64) return false;
  if (SQL_META_REGEX.test(password)) return false;
  return true;
}

exports.getUsers = async (req, res) => {
  return res.status(403).json({ error: "Forbidden" });
};

exports.createUser = async (req, res) => {
  return res.status(403).json({ error: "Forbidden" });
};

exports.updateUser = async (req, res) => {
  return res.status(403).json({ error: "Forbidden" });
};

exports.deleteUser = async (req, res) => {
  return res.status(403).json({ error: "Forbidden" });
};

exports.loginVulnerable = async (req, res) => {
  const { username, password } = req.body || {};
  if (!isValidCredentials(username, password)) {
    return res.status(400).json({ error: "Invalid input format" });
  }
  try {
    const user = await User.findVulnerable(username.trim(), password);
    if (!user || user.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    return res.json({ message: "Login successful", user: [user[0]] });
  } catch (err) {
    return res.status(500).json({ error: "Login failed" });
  }
};

exports.getPasswordByCredentials = async (req, res) => {
  const { username, password } = req.body || {};
  if (!isValidCredentials(username, password)) {
    return res.status(400).json({ error: "Invalid input format" });
  }
  try {
    const result = await User.findPasswordByCredentials(username.trim(), password);
    if (!result || result.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    return res.json({ response: [{ username: result[0].username, valid: true }] });
  } catch (err) {
    return res.status(500).json({ error: "Failed to verify password" });
  }
};
