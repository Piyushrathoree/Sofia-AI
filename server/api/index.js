// /api/index.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // Load environment variables

import serverless from "serverless-http";
import { app } from "../app.js";
import connectDB from "../db/db.js";

// Connect to the database. Note: In a serverless environment, cold starts may re-run this.
// Depending on your DB (e.g., MongoDB), this may be optimized by caching the connection.
connectDB()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("MongoDB connection failed:", err));

// Export your Express app as a serverless function
export default serverless(app);
