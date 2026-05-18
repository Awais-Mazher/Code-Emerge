import userModel from "../models/user.model.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generateToken from "../utils/tokenGeneration.js"

// LOGIN USER

const loginUser = async (req, res)=>{
    const {email, password} = req.body;

    try {
        
        // Checking User

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }

        // Checking Password

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user._id);

        // Sending Response

        res.json({
            success: true,
            token: token,
            userRole: user.role,
            message: "Logged in Successfully!"
        })

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// REGISTER USER

const registerUser = async (req, res)=>{
    const {username, email, password} = req.body;

    try {

        // Checking username

        const usernameMatch = await userModel.findOne({username});

        if(usernameMatch){
            return res.json({
                success: false,
                message: "Username already taken"
            })
        }

        // Checking if user exists

        const exists = await userModel.findOne({email});

        if(exists){
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        // Checking Email & Password Strength

        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "Invalid email format"
            })
        }

        if(password.length < 8){
            return res.json({
                success: false,
                message: "Please enter a strong password (>7)"
            })
        }

        // Hashing Password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating User

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = generateToken(user._id);

        // Sending Response

        res.json({
            success: true,
            token: token,
            userRole: user.role,
            message: "Registered Successfully!"
        })

    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// GET USER DATA BY TOKEN

const getUserData = async (req, res)=>{
    const token = req.headers.token;

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({_id: token_decode.id}).select(
            "-password -_id -__v"
        ).populate([
            {
                path: "problemsSolved",
                select: "title difficulty"
            },
            {
                path: "submissions",
                select: "problemTitle problemDescription problemDifficulty status language code"
            }
        ]);

        if(!user){
            return res.json({
                success: false,
                messag: "User not found"
            })
        }

        res.json({
            success: true,
            userData: user
        });

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// GET USER DATA BY ID

const getUserDataById = async (req, res)=>{
    const {userId} = req.body;

    try {
        const user = await userModel.findById(userId);

        if(!user){
            return res.json({
                success: false,
                message: "User not Found"
            })
        }

        res.json({
            success: true,
            user
        })
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "An Error occurred"
        })
    }
}

// GET USERS DATA

const getUsersData = async (req, res)=>{
    try {
        const users = await userModel.find({}).select("-password -submissions");

        res.json({
            success: true,
            users
        });

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "An Error occured while fetching the users data"
        })
    }
}

// DELETE USER

const deleteUser = async (req, res)=>{
    try {
        const {userId} = req.body;

        const user = await userModel.findByIdAndDelete(userId);
    
        res.json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (err) {
        res.json({
            success: false,
            message: "Error deleting User"
        })
    }
}

// UPDATE USER

const updateUser = async (req, res)=>{
    try {
        const {username, email, rankPoints, role} = req.body;
        const {id} = req.headers;

        // Problem Instance Updation in db

        const updatedUser = await userModel.findByIdAndUpdate(id, {
            username,
            email,
            rankPoints,
            role
        }, {new: true, runValidators: true});

        if(!updatedUser){
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        // Sending Response

        res.json({
            success: true,
            message: "User Updated Successfully"
        })
    } catch (err) {
        console.log(err);
        res.json({
          success: false,
          message: `An error occurred: ${err}`
        })
    }
}

// GET USER RANKING

const getUsersRanking = async (req, res)=>{
    try {
        const topUsers = await userModel.find({ role: { $ne: "admin" } }).sort({ rankPoints: -1 }).limit(10).populate({ path: "problemsSolved", select: "difficulty" });

        res.json({
            success: true,
            topUsers
        })
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "There was an error fetching the Rankings"
        })
    }
}

export { loginUser, registerUser, getUserData, getUserDataById, getUsersData, deleteUser, updateUser, getUsersRanking};