import express from "express";
import { analyzeCode } from "../controllers/analyzer.controller.js";

const analyzerRouter = express.Router();

analyzerRouter.post("/analyze", analyzeCode);

export default analyzerRouter;