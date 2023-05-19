const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/feedback", authorization, async (req, res) => {
  try {
    const allFeedback = await pool.query(
      "SELECT * FROM feedback ORDER BY feedbackid ASC "
    );
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
      "SELECT * FROM feedback WHERE feedbackid = $1 ",
      [id]
    );
    console.log(`GET feedback ${id}`);
    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.patch("/feedback/category/:id", authorization, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { category } = req.body;
    const feedback = await pool.query(
      "UPDATE feedback SET category = $1 WHERE feedbackid = $2   RETURNING *;",
      [category, id]
    );
    console.log(`PATCH category feedback ${id}`);
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
      "UPDATE feedback SET upvotes = $1 WHERE feedbackid = $2   RETURNING *;",
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
      "DELETE FROM feedback WHERE feedbackid = $1",
      [id]
    );
    console.log(`DELETE feedback ${id}`);
    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/feedback", authorization, async (req, res) => {
  try {
    const { title, category, details } = req.body;
    const feedback = await pool.query(
      "INSERT INTO feedback (title, category, details) VALUES ($1, $2, $3) RETURNING *",
      [title, category, details]
    );
    console.log(`CREATE feedback ${feedback.rows[0].feedbackid}`);
    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
