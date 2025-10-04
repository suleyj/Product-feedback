const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/comments/:id", authorization, async (req, res) => {
  try {
    const feedbackId = parseInt(req.params.id);

    const comments = await pool.query(
      `SELECT
         c.comment_text,
         c.created_at,
         u.username,
         u.fullname
       FROM comments c
       INNER JOIN users u ON c.user_id = u.id
       WHERE c.feedback_id = $1
       ORDER BY c.created_at ASC`,
      [feedbackId]
    );

    res.json(comments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/comments", authorization, async (req, res) => {
  try {
    const {feedback_id, user_id, comment_text} = req.body;
    const comment = await pool.query(
      "INSERT INTO comments (feedback_id, user_id, comment_text ) VALUES ($1, $2, $3) RETURNING *",
      [feedback_id, user_id, comment_text]
    );
    res.json(comment.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
