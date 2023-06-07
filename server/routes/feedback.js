const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/feedback", authorization, async (req, res) => {
  try {
    const allFeedback = await pool.query(
      "SELECT * FROM feedback ORDER BY feedback_id ASC "
    );

    const upvotes = await pool.query(
      "SELECT p.feedback_id, p.title, COUNT(l.feedback_id) AS num_upvotes " +
        "FROM feedback p LEFT JOIN upvote l ON p.feedback_id = l.feedback_id " +
        "GROUP BY p.feedback_id, p.title " +
        "ORDER BY p.feedback_id"
    );

    const counts = await pool.query(
      "SELECT f.feedback_id, COUNT(c.feedback_id) AS comment_count " +
        "FROM feedback f " +
        "LEFT JOIN comment c ON f.feedback_id = c.feedback_id " +
        "GROUP BY f.feedback_id " +
        "order by feedback_id"
    );

    for (let i = 0; i < allFeedback.rows.length; i++) {
      allFeedback.rows[i].upvotes = upvotes.rows[i].num_upvotes;
      allFeedback.rows[i].comment_count = counts.rows[i].comment_count;
    }

    console.log("GET all feedback");
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
      "SELECT * FROM feedback WHERE feedback_id = $1 ",
      [id]
    );

    console.log(`GET feedback ${id}`);
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

router.patch("/feedback/upvotes/:id", authorization, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { upvotes } = req.body;
    const feedback = await pool.query(
      "UPDATE feedback SET upvotes = $1 WHERE feedback_id = $2   RETURNING *;",
      [upvotes, id]
    );
    console.log(`PATCH upvotes feedback ${id}`);
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
