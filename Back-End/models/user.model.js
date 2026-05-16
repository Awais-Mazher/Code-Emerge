import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    rankPoints: {
        type: Number,
        default: 0
    },
    problemsSolved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "problem"
        }
    ],
    submissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "submission"
        }
    ]
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;