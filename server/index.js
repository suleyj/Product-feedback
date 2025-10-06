require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/auth", require("./routes/jwtAuth"));
app.use("/api", require("./routes/feedback"));
app.use("/api", require("./routes/comments"));
app.use("/api", require("./routes/upvote"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
