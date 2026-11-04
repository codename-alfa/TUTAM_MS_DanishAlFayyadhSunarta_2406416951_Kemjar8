const User = require("../models/userModels");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.createUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const newUser = await User.create({ name, username, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, password } = req.body;
  try {
    const updatedUser = await User.update(id, { name, username, email, password });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.remove(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

exports.loginVulnerable = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findVulnerable(username, password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getPasswordByCredentials = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await User.findPasswordByCredentials(username, password);
    if (!result) return res.status(404).json({ error: "User not found" });
    res.json({ response: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch password" });
  }
};
