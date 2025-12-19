import pool from "../db.js";

export async function cleanDemoUserData() {
    const { rows } = await pool.query(`
      SELECT id FROM feedback_board.users
      WHERE role = 'demo'
    `);

    const demoUserId = rows[0].id;

    await pool.query("DELETE FROM feedback_board.comments WHERE user_id = $1", [
        demoUserId,
    ]);
    await pool.query("DELETE FROM feedback_board.upvotes WHERE user_id = $1", [
        demoUserId,
    ]);

    await pool.query(
        `DELETE FROM feedback_board.comments c
         USING feedback_board.feedback f
         WHERE c.feedback_id = f.id
         AND f.user_id = $1`,
        [demoUserId],
    );

    await pool.query(
        `DELETE FROM feedback_board.upvotes c
         USING feedback_board.feedback f
         WHERE c.feedback_id = f.id
         AND f.user_id = $1`,
        [demoUserId],
    );

    await pool.query("DELETE FROM feedback_board.feedback WHERE user_id = $1", [
        demoUserId,
    ]);
}
