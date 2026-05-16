import express from "express"
import { addProblem, problemsList, deleteProblem, updateProblem, singleProblem, getCategoryStats } from "../controllers/problem.controller.js"
import isAdmin from "../middlewares/isAdmin.js"

const problemRouter = express.Router();

problemRouter.post("/add", isAdmin, addProblem);
problemRouter.get("/problemsList", problemsList);
problemRouter.get("/categories", getCategoryStats);
problemRouter.post("/delete", isAdmin, deleteProblem);
problemRouter.post("/update", isAdmin, updateProblem);
problemRouter.post("/singleProblem", singleProblem);

export default problemRouter;