import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // Load env variables

import serverless from "serverless-http";
import { app } from "../app.js";  // Import your Express app
import connectDB from "../db/db.js";

// Connect to the database (note: in serverless, this might re-run on cold starts)
connectDB()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

export default serverless(app);
