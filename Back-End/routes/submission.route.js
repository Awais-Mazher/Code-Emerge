import express from "express"
import { handleRun, handleSubmit } from "../controllers/submission.controller.js"

const submissionRouter = express.Router();

submissionRouter.post("/run", handleRun);
submissionRouter.post("/submit", handleSubmit);

export default submissionRouter;