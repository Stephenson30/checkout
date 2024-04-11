import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log("error connecting to mongoDB", error)
    }
};