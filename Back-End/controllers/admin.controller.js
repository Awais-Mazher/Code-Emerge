import userModel from "../models/user.model.js"
import problemModel from "../models/problem.model.js"

const adminHomeData = async (req, res)=>{
    try {
        const users = await userModel.countDocuments();
        const recentProblems = await problemModel.find({}).sort({createdAt: -1}).limit(4);
        const problemCount = await problemModel.countDocuments();

        const difficultyStats = await problemModel.aggregate([
            {
              $group: {
                _id: "$difficulty",
                count: { $sum: 1 }
              }
            }
        ]);

        const stats = { Easy: 0, Medium: 0, Hard: 0 };

        difficultyStats.forEach(item => {
            stats[item._id] = item.count;
        });

        res.json({
            success: true,
            data: {
                users,
                recentProblems,
                problemCount,
                difficultyStats: stats
            }
        })
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error Fetching Data"
        })
    }
}

export { adminHomeData };