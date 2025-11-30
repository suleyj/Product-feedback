import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const port = process.env.PORT;

app.use(express.json());

import jwtAuthRoutes from "./routes/jwtAuth.js";
import feedbackRoutes from "./routes/feedback.js";
import commentsRoutes from "./routes/comments.js";
import upvoteRoutes from "./routes/upvote.js";

app.use("/api/auth", jwtAuthRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", commentsRoutes);
app.use("/api", upvoteRoutes);

app.get("/", (_req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
