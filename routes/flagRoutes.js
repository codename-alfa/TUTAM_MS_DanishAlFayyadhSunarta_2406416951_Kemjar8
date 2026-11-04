const express = require("express");
const router = express.Router();
const flagController = require("../controllers/flagController");

router.post("/validate", flagController.validateFlags);

module.exports = router;