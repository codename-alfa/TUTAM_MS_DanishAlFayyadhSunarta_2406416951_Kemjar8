const { Pool } = require('@neondatabase/serverless');
require('dotenv').config();

async function resetFlags() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const targetUserId = process.argv[2];

  try {
    if (targetUserId) {
      const res = await pool.query(
        'UPDATE flags SET is_validated = FALSE WHERE user_id = $1 RETURNING *',
        [targetUserId]
      );
      console.log(`✅ Status flag untuk user_id ${targetUserId} berhasil di-reset ke FALSE.`);
      console.log(res.rows);
    } else {
      const res = await pool.query('UPDATE flags SET is_validated = FALSE RETURNING *');
      console.log(`✅ Seluruh status flag (${res.rowCount} baris) berhasil di-reset ke FALSE.`);
    }
  } catch (err) {
    console.error('❌ Gagal mereset status flag:', err);
  } finally {
    await pool.end();
  }
}

resetFlags();
