import express from "express";
import pool from "../db.js";
import { authorization } from "../middleware/authorization.js";
const router = express.Router();

router.get("/comments/:id", authorization, async (req, res) => {
    try {
        const feedbackId = parseInt(req.params.id);

        const comments = await pool.query(
            `SELECT
         c.comment_text,
         c.created_at,
         u.username,
         u.fullname
       FROM feedback_board.comments c
       INNER JOIN feedback_board.users u ON c.user_id = u.id
       WHERE c.feedback_id = $1
       ORDER BY c.created_at ASC`,
            [feedbackId],
        );

        res.json(comments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/comments", authorization, async (req, res) => {
    try {
        const { feedback_id, user_id, comment_text } = req.body;
        const comment = await pool.query(
            "INSERT INTO feedback_board.comments (feedback_id, user_id, comment_text ) VALUES ($1, $2, $3) RETURNING *",
            [feedback_id, user_id, comment_text],
        );
        res.json(comment.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;
