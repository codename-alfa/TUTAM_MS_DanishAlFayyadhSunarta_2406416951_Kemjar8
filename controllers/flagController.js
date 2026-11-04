const Flag = require("../models/flagModels");

exports.validateFlags = async (req, res) => {
    const { user_id, flag } = req.body;
    try{
        const result = await Flag.validateFlags(user_id, flag);
        return res.json(result);
    } catch (error) {
        console.error("Error validating flags:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
