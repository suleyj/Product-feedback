const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/comments/:id", authorization, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const comment = await pool.query(
      "SELECT comment_text, username, fullname, image_name FROM comment INNER JOIN account ON comment.account_id=account.account_id WHERE feedback_id = $1",
      [id]
    );
    res.json(comment.rows);
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
    //console.log(`CREATE feedback ${feedback.rows[0].feedbackid}`);
    res.json(comment.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
