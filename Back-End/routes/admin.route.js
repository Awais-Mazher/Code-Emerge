import express from "express"
import isAdmin from "../middlewares/isAdmin.js"
import { adminHomeData } from "../controllers/admin.controller.js"

const adminRouter = express.Router();

adminRouter.get("/homeData", isAdmin, adminHomeData);

export default adminRouter;