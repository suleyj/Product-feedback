import express from "express";
import pool from "../db.js";
import { authorization } from "../middleware/authorization.js";
const router = express.Router();

router.post("/upvote", authorization, async (req, _res) => {
    const { account_id, feedback_id } = req.body;
    await pool.query(
        "INSERT INTO feedback_board.upvote (account_id, feedback_id) VALUES ($1, $2) RETURNING *",
        [account_id, feedback_id],
    );
});

router.delete("/upvote", authorization, async (req, _res) => {
    const { account_id, feedback_id } = req.body;
    await pool.query(
        "DELETE FROM feedback_board.feedback WHERE account_id = $1 AND feedback_id = $2",
        [account_id, feedback_id],
    );
});

export default router;
