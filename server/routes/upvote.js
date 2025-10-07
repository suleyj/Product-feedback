const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/upvote", authorization, async (req, res) => {
  const { account_id, feedback_id } = req.body;
  const upvotes = await pool.query(
    "INSERT INTO feedback_board.upvote (account_id, feedback_id) VALUES ($1, $2) RETURNING *",
    [account_id, feedback_id]
  );
});

router.delete("/upvote", authorization, async (req, res) => {
  const { account_id, feedback_id } = req.body;
  const upvotes = await pool.query(
    "DELETE FROM feedback_board.feedback WHERE account_id = $1 AND feedback_id = $2",
    [account_id, feedback_id]
  );
});

module.exports = router;
