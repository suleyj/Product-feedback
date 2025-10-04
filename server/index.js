require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/jwtAuth"));
app.use(require("./routes/feedback"));
app.use(require("./routes/comments"));
app.use(require("./routes/upvote"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
