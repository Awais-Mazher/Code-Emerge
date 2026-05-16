import mongoose from "mongoose"

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true,
        index: true
    },
    functionName: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    hints: {
        type: [String],
        required: true
    },
    examples: [
        {
            _id: false,
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            },
            explanation: {
                type: String,
                required: true
            }
        }
    ],
    initialCodes: {
        js: {
            type: String,
            required: true
        },
        python: {
            type: String,
            required: true
        }
    },
    testCases: [
        {
            _id: false,
            input: {
                type: [mongoose.Schema.Types.Mixed],
                required: true
            },
            output: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            }
        }
    ]
}, {timestamps: true});

const problemModel = mongoose.models.problem || mongoose.model("problem", problemSchema);

export default problemModel;