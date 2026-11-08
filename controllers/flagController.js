const Flag = require("../models/flagModels");

const FLAG_REGEX = /^FLAG\{[a-zA-Z0-9_]{5,64}\}$/;

exports.validateFlags = async (req, res) => {
  const { user_id, flag } = req.body || {};
  const parsedId = Number(user_id);

  if (
    !Number.isInteger(parsedId) ||
    parsedId <= 0 ||
    parsedId > 10000 ||
    typeof flag !== "string" ||
    !FLAG_REGEX.test(flag.trim())
  ) {
    return res.status(400).json({ error: "Invalid input format" });
  }

  try {
    const result = await Flag.validateFlags(parsedId, flag.trim());
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
