const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  s3Client,
  PutObjectCommand,
  generateFileName,
  BUCKET_NAME,
} = require("../utils/aws");

router.post(
  "/register",
  upload.single("image"),
  validInfo,
  async (req, res) => {
    try {
      //1.destructure the req.body (name, email, password)
      const { fullname, username, password } = req.body;
      //2. check if user exist(if user exis then throw error)
      const account = await pool.query(
        "SELECT * FROM feedback_board.users WHERE username = $1",
        [username]
      );
      if (account.rows.length !== 0) {
        return res.status(401).send("User already exist");
      }

      //3. Bcrypt the user password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt);

      //4. put image on aws
      // const fileName = generateFileName();
      // const params = {
      //   Bucket: BUCKET_NAME,
      //   Key: fileName,
      //   Body: req.file.buffer,
      //   ContentType: req.file.mimetype,
      // };
      // const command = new PutObjectCommand(params);
      // await s3Client.send(command);

      //5. enter the new user inside our database
      let newUser = await pool.query(
        "INSERT INTO feedback_board.users (fullname, username, password) VALUES ($1, $2, $3) RETURNING *",
        [fullname, username, bcryptPassword ]
      );

      //5. generating our jwt token
      const token = jwtGenerator(newUser.rows[0].id);
      res.json({
      token: token,
      user: { id: newUser.rows[0].id },
    });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//login route
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body
    const { username, password } = req.body;

    //2. check if user doesn't exist (if not then we throw error)
    const user = await pool.query("SELECT * FROM feedback_board.users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Username is incorrect");
    }

    //3. check if incoming password is the same the database password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Password or Username is incorrect");
    }

    //4.give them a jwtToken
    const token = jwtGenerator(user.rows[0].id);
    res.json({
      token: token,
      user: { id: user.rows[0].id },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.get("/is-verify", authorization, async (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });
module.exports = router;
