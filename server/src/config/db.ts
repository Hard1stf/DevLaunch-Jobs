import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.mongooseURI);
        console.log(`MongoDB connected Successfully 🍃`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error}`);
        process.exit(1);
    }
};