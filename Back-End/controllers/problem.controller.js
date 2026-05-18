import problemModel from "../models/problem.model.js"

const addProblem = async (req, res)=>{
    try {
        const {title, description, difficulty, hints, functionName, points, category, examples, testCases, initialCodes} = req.body;
        let parsedTestcases, parsedExamples, parsedInitialCodes, parsedHints;

        try {
            parsedTestcases = JSON.parse(testCases);
        } catch (parseError) {
            return res.json({
                success: false,
                message: "Invalid JSON format for Test Cases"
            })
        }

        try {
            parsedInitialCodes = JSON.parse(initialCodes);
        } catch (err) {
            return res.json({
                success: false,
                message: "Invalid JSON format for Initial Codes"
            })
        }

        try {
            parsedHints = JSON.parse(hints);
        } catch (err) {
            return res.json({
                success: false,
                message: "Invalid JSON format for Hints"
            })
        }

        try {
            parsedExamples = JSON.parse(examples);
        } catch (err) {
            return res.json({
                success: false,
                message: "Invalid JSON format for Examples"
            })
        }

        // Problem Instance Creation in db

        const newProblem = new problemModel({
            title,
            description,
            points,
            functionName,
            difficulty,
            category,
            hints: parsedHints,
            examples: parsedExamples,
            initialCodes: parsedInitialCodes,
            testCases: parsedTestcases
        });

        const problem = await newProblem.save();
        console.log(problem);

        // Sending Response

        res.json({
            success: true,
            message: "Problem Added Successfully"
        })
    } catch (err) {
        console.log(err);
        res.json({
          success: false,
          message: `An error occurred: ${err}`
        })
    }
}

const problemsList = async (req, res)=>{
    try {
        const allProblems = await problemModel.find({});

        res.json({
            success: true,
            data: allProblems
        })
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: `An error occurred: ${err}`
        })
    }
}

const deleteProblem = async (req, res)=>{
    try {
        const { id } = req.body;

        await problemModel.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Problem Deleted Successfully"
        })
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: `An error occurred: ${err}`
        })
    }
}

const updateProblem = async (req, res)=>{
    try {
        const {title, description, difficulty, hints, functionName, points, category, examples, testCases, initialCodes} = req.body;
        const {id} = req.headers;
        let parsedTestcases, parsedInitialCodes, parsedExamples, parsedHints;

        try {
            parsedTestcases = JSON.parse(testCases);
        } catch (parseError) {
            return res.json({
                success: false,
                message: "Invalid JSON format Test Cases"
            })
        }

        try {
            parsedInitialCodes = JSON.parse(initialCodes);
        } catch (err) {
            return res.json({
                success: false,
                message: "Invalid JSON format for Initial Codes"
            })
        }

        try {
            parsedHints = JSON.parse(hints);
        } catch (err) {
            return res.json({
                success: false,
                message: "Invalid JSON format for Hints"
            })
        }

        try {
            parsedExamples = JSON.parse(examples);
        } catch (err) {
            return res.json({
                success: false,
                message: "Invalid JSON format for Examples"
            })
        }

        // Problem Instance Updation in db

        const updatedProblem = await problemModel.findByIdAndUpdate(id, {
            title,
            description,
            difficulty,
            hints: parsedHints,
            functionName,
            points,
            category,
            examples: parsedExamples,
            testCases: parsedTestcases,
            initialCodes: parsedInitialCodes
        }, {new: true, runValidators: true});

        if(!updatedProblem){
            return res.json({
                success: false,
                message: "Problem not found"
            })
        }

        // Sending Response

        res.json({
            success: true,
            message: "Problem Updated Successfully"
        })
    } catch (err) {
        console.log(err);
        res.json({
          success: false,
          message: `An error occurred: ${err}`
        })
    }
}

const singleProblem = async (req, res)=>{
    const { problemId } = req.body;

    try {
        if(problemId){
            const problem = await problemModel.findById(problemId);

            res.json({
                success: true,
                message: "Problem fetched successfully",
                problem
            })
        }
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error fetching problem"
        })
    }
}

const getCategoryStats = async (req, res) => {
    try {
      const stats = await problemModel.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1
          }
        },
        {
          $sort: { category: 1 }
        }
      ]);
  
      res.json({
        success: true,
        data: stats
      });
  
    }catch (err) {
      console.log(err);
      res.json({
        success: false,
        message: "Error fetching category details"
      });
    }
};

export { addProblem, problemsList, deleteProblem, updateProblem, singleProblem, getCategoryStats };