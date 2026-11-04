const { pool } = require("../db");

exports.validateFlags = async (userId, flags) => {
    const result = await pool.query(`
        SELECT * FROM flags
        WHERE user_id = $1 AND flag = $2
    `, [userId, flags]);

    if (result.rows.length === 0) {
        const message = "No flags found";
        return { message, data: [] };
    }

    await pool.query(`
        UPDATE flags
        SET is_validated = TRUE
        WHERE user_id = $1 AND flag = $2
    `, [userId, flags]);

    const updated = await pool.query(`
        SELECT * FROM flags
        WHERE user_id = $1 AND flag = $2
    `, [userId, flags]);

    const message = "Flags validated successfully";
    return { message, data: updated.rows };
};
