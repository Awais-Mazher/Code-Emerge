import mongoose from "mongoose"

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true
    },
    problemTitle: {
        type: String,
        required: true
    },
    problemDescription: {
        type: String,
        required: true
    },
    problemDifficulty: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ["javascript", "python"],
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Accepted", "Rejected", "Error"],
        default: "Pending",
        required: true
    }
}, {timestamps: true});

const submissionModel = mongoose.models.submission || mongoose.model("submission", submissionSchema);

export default submissionModel;