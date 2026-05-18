import mongoose from "mongoose"

const dbConnection = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/codeemerge`);
        console.log("Database Connected");
    } catch (err) {
        console.log(`Database connection error: ${err}`);
    }
}

export default dbConnection;