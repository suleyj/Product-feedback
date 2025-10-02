const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/feedback", authorization, async (req, res) => {
  try {
    const allFeedback = await pool.query(
      "SELECT * FROM feedback ORDER BY id ASC "
    );

    const upvotes = await pool.query(
      "SELECT f.id, f.title, COUNT(u.id) AS upvote_count " +
        "FROM feedback f LEFT JOIN upvotes u ON f.id = u.feedback_id " +
        "GROUP BY f.id, f.title " +
        "ORDER BY f.id"
    );

    const counts = await pool.query(
      "SELECT f.id, COUNT(c.id) AS comment_count " +
        "FROM feedback f " +
        "LEFT JOIN comments c ON f.id = c.feedback_id " +
        "GROUP BY f.id " +
        "order by f.id"
    );

    for (let i = 0; i < allFeedback.rows.length; i++) {
      allFeedback.rows[i].upvotes = upvotes.rows[i].upvote_count;
      allFeedback.rows[i].comment_count = counts.rows[i].comment_count;
    }

    res.json(allFeedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/feedback/:id", authorization, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const feedback = await pool.query(
      "SELECT * FROM feedback WHERE id = $1 ",
      [id]
    );
    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/feedback/:id", authorization, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, category, status, description } = req.body;
    const feedback = await pool.query(
      "UPDATE feedback SET title = $1, category = $2, details = $3, status = $4 WHERE feedback_id = $5   RETURNING *;",
      [title, category, description, status, id]
    );

    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/feedback/:id", authorization, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const feedback = await pool.query(
      "DELETE FROM feedback WHERE feedback_id = $1",
      [id]
    );
    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/feedback", authorization, async (req, res) => {
  try {
    const { account_id, title, category, details } = req.body;
    const feedback = await pool.query(
      "INSERT INTO feedback (account_id, title, category, details) VALUES ($1, $2, $3, $4) RETURNING *",
      [account_id, title, category, details]
    );
    console.log(`CREATE feedback ${feedback.rows[0].feedbackid}`);
    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
