import express from "express"
import cors from "cors"
import "dotenv/config"
import dbConnection from "./config/db.js"
import userRouter from "./routes/user.route.js"
import problemRouter from "./routes/problem.route.js"
import adminRouter from "./routes/admin.route.js"
import submissionRouter from "./routes/submission.route.js"
import analyzerRouter from "./routes/analyzer.route.js"

const app = express();

app.use(express.json());
app.use(cors());

// DATABASE CONNECTION

dbConnection();

// API's

// User

app.use("/api/user", userRouter);

// Problem

app.use("/api/problem", problemRouter);

// Admin

app.use("/api/admin", adminRouter);

// Submission

app.use("/api/submission", submissionRouter);

// Analyzer

app.use("/api/analyzer", analyzerRouter);

// Base

app.get("/", (req, res)=>{
    res.send("API Working");
})

app.listen(process.env.PORT || 8000);