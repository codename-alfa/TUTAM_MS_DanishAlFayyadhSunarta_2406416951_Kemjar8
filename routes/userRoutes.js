const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const blockUnauthenticatedCrud = (req, res) => {
  return res.status(403).json({ error: "Forbidden" });
};

router.get("/", blockUnauthenticatedCrud);
router.post("/", blockUnauthenticatedCrud);
router.put("/:id", blockUnauthenticatedCrud);
router.delete("/:id", blockUnauthenticatedCrud);
router.post("/login", userController.loginVulnerable);
router.post("/password", userController.getPasswordByCredentials);

module.exports = router;
