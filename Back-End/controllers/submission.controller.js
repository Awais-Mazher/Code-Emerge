import submissionModel from "../models/submission.model.js"
import userModel from "../models/user.model.js"
import codeExecution from "../utils/codeExecution.js"
import jwt from "jsonwebtoken"

const handleRun = async (req, res)=>{
    const {testCases, functionName, languageId, userCode} = req.body;

    const result = await codeExecution(testCases, functionName, languageId, userCode);

    console.log(result);

    if(typeof(result) === "string"){
        return res.json({
            success: false,
            result
        })
    }

    res.json({
        success: true,
        result
    })
}

const handleSubmit = async (req, res)=>{
    const {testCases, functionName, languageId, userCode, points, problemTitle, problemDescription, problemDifficulty, problemId, language, token} = req.body;

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        const userId = tokenDecode.id;
        const user = await userModel.findById(userId);
        let submissionResult;
    
        // If user is not found
    
        if(!user){
            return res.json({
                success: false,
                message: "User not found"
            })
        }
    
        const result = await codeExecution(testCases, functionName, languageId, userCode);
    
        // In Case of API Error
    
        if(typeof(result) === "string"){
            return res.json({
                success: false,
                output: result,
                message: "An error occured while submitting your code"
            })
        }
    
        submissionResult = result.every(testCase => testCase.result === "Accepted");
    
        if(submissionResult){
            // Submission Creation
    
            const newSubmission = new submissionModel({
                userId,
                problemId,
                language,
                problemTitle,
                problemDescription,
                problemDifficulty,
                code: userCode,
                status: "Accepted"
            });
            const submission = await newSubmission.save();

            // Determining the rank points

            const alreadySolved = user.problemsSolved.some(id => id.equals(problemId));
            let rankPoints;

            if(alreadySolved){
                rankPoints = 0;
            }
            else{
                rankPoints = points;
            }
    
            // Submission Insertion in User Data
    
            await userModel.findByIdAndUpdate(
                userId,
                { 
                  $push: { submissions: submission._id },
                  $addToSet: { problemsSolved: problemId },
                  $inc: { rankPoints: rankPoints }
                },
                { new: true }
            );

            // Sending Response

            res.json({
                success: true,
                result: true,
                output: result,
                message: "Congratulations! You solved the problem"
            })
        }
        else{
            // Problem Status Check
    
            let problemStatus;
        
            if(result.some(testCase => testCase.result === "Rejected")){
                problemStatus = "Rejected";
            }
            else{
                problemStatus = "Error";
            }
    
            // Submission Creation
    
            const newSubmission = new submissionModel({
                userId,
                problemId,
                language,
                problemTitle,
                problemDescription,
                problemDifficulty,
                code: userCode,
                status: problemStatus
            });
            const submission = await newSubmission.save();
    
            // Submission Insertion in User Data
    
            await userModel.findByIdAndUpdate(
                userId,
                { $push: { submissions: submission._id } },
                { new: true }
            );
    
            // Sending response according to Status
    
            if(problemStatus === "Rejected"){
                res.json({
                    success: true,
                    result: false,
                    output: result,
                    message: "Incorrect Solution"
                })
            }
            else{
                res.json({
                    success: true,
                    result: false,
                    output: result,
                    message: "Error in your code"
                })
            }
        }
    } catch (err) {
        res.json({
            success: false,
            output: result,
            message: "An Error occured while submitting code"
        })
    }
}

export { handleRun, handleSubmit }