const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

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
  console.log(`Example app listening on port ${port}`);
});
