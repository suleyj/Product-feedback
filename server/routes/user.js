const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/user/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const comment = await pool.query(
      "SELECT user_name, full_name, profile_pic FROM users WHERE user_id = $1 ",
      [id]
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
