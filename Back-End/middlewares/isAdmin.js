import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

const isAdmin = async (req, res, next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({
            success: false,
            message: "Not Authorized, Login Again"
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        const userId = tokenDecode.id;

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({
                success: false,
                message: "Admin does not exist"
            })
        }

        if(user.role === "admin"){
            next();
        }
        else{
            return res.json({
                success: false,
                message: "You are not an Admin"
            })
        }
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "An error occurred"
        })
    }
}

export default isAdmin;