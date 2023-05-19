const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    //1.destructure the req.body (name, email, password)
    // const { fullname, username, password, image } = req.body;
    // //2. check if user exist(if user exis then throw error)
    // const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
    //   username,
    // ]);
    // if (user.rows.length !== 0) {
    //   return res.status(401).send("User already exist");
    // }
    // //3. Bcrypt the user password
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const bcryptPassword = await bcrypt.hash(password, salt);
    // // //4. enter the new user inside our database
    // let newUser;
    // console.log(image);
    // if (image === "") {
    //   newUser = await pool.query(
    //     "INSERT INTO users (full_name, user_name, user_password) VALUES ($1, $2, $3) RETURNING *",
    //     [fullname, username, bcryptPassword]
    //   );
    // } else {
    //   newUser = await pool.query(
    //     "INSERT INTO users (full_name, user_name, user_password, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *",
    //     [fullname, username, bcryptPassword, image]
    //   );
    // }
    //5. generating our jwt token
    //const token = jwtGenerator(newUser.rows[0].user_id);
    //res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//login route
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body

    const { username, password } = req.body;

    //2. check if user doesn't exist (if not then we throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Username is incorrect");
    }
    //3. check if incoming password is the same the database password

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Username is incorrect");
    }

    //4.give them a jwtToken

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
