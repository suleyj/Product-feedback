const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/comments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const comment = await pool.query(
      "SELECT comment_info, user_name, full_name, profile_pic FROM commentstable INNER JOIN users ON commentstable.userid=users.user_id WHERE feedbackid = $1",
      [id]
    );
    res.json(comment.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.post("/comments", authorization, async (req, res) => {
//   try {
//     const { feedbackid, userid, commentInfo } = req.body;
//     const comment = await pool.query(
//       "INSERT INTO commentstable (feedbackid, userid, comment_info ) VALUES ($1, $2, $3) RETURNING *",
//       [feedbackid, userid, commentInfo]
//     );
//     //console.log(`CREATE feedback ${feedback.rows[0].feedbackid}`);
//     res.json(comment.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
