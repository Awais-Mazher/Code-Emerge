import express from "express";
import { loginUser, registerUser, getUserData, getUserDataById, getUsersData, getUsersRanking, deleteUser, updateUser } from "../controllers/user.controller.js";
import isAdmin from "../middlewares/isAdmin.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getData", getUserData);
userRouter.post("/getDataById", getUserDataById);
userRouter.get("/getUsersData", isAdmin, getUsersData);
userRouter.post("/deleteUser", isAdmin, deleteUser);
userRouter.post("/updateUser", isAdmin, updateUser);
userRouter.get("/getRanking", getUsersRanking);

export default userRouter;