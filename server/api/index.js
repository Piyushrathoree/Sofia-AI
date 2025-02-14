// /api/index.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import serverless from "serverless-http";
import { app } from "../app.js";
import connectDB from "../db/db.js";

let isConnected = false; // Track the database connection state

const connectToDB = async () => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
        console.log("Database connected");
    }
};

// Connect to the database
connectToDB().catch((err) => console.error("MongoDB connection failed:", err));

export default serverless(app);
