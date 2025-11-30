import express from "express";
import pool from "../db.js";
import authorization from "../middleware/authorization.js";

const router = express.Router();
router.get("/feedback", authorization, async (_req, res) => {
    try {
        const allFeedback = await pool.query(
            "SELECT * FROM feedback_board.feedback ORDER BY id ASC ",
        );

        const upvotes = await pool.query(
            "SELECT f.id, f.title, COUNT(u.id) AS upvote_count " +
                "FROM feedback_board.feedback f LEFT JOIN feedback_board.upvotes u ON f.id = u.feedback_id " +
                "GROUP BY f.id, f.title " +
                "ORDER BY f.id",
        );

        const counts = await pool.query(
            "SELECT f.id, COUNT(c.id) AS comment_count " +
                "FROM feedback_board.feedback f " +
                "LEFT JOIN feedback_board.comments c ON f.id = c.feedback_id " +
                "GROUP BY f.id " +
                "order by f.id",
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
            "SELECT * FROM feedback_board.feedback WHERE id = $1 ",
            [id],
        );

        if (feedback.rows.length === 0) {
            res.status(404).send("Cannot find resource");
            return;
        }

        res.json(feedback.rows[0]);
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
            "UPDATE feedback_board.feedback SET title = $1, category = $2, details = $3, status = $4 WHERE id = $5   RETURNING *;",
            [title, category, description, status, id],
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
        await pool.query(
            "DELETE FROM feedback_board.comments WHERE feedback_id = $1",
            [id],
        );

        const feedback = await pool.query(
            "DELETE FROM feedback_board.feedback WHERE id = $1",
            [id],
        );
        res.json(feedback.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/feedback", authorization, async (req, res) => {
    try {
        const { user_id, title, category, details } = req.body;
        const feedback = await pool.query(
            "INSERT INTO feedback_board.feedback (user_id, status, title, category, details) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user_id, "Suggestion", title, category, details],
        );
        res.json(feedback.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;
