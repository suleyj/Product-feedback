import express from "express";
import cron from "node-cron";
import { cleanDemoUserData } from "./utils/cleanDemo.js"  
import jwtAuthRoutes from "./routes/jwtAuth.js";
import feedbackRoutes from "./routes/feedback.js";
import commentsRoutes from "./routes/comments.js";
import upvoteRoutes from "./routes/upvote.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", jwtAuthRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", commentsRoutes);
app.use("/api", upvoteRoutes);

app.get("/", (_req, res) => {
    res.send("Hello World!");
});


//remove demo user info every week
cron.schedule("0 0 * * *"
, () => {
    cleanDemoUserData()
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
