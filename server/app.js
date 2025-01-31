import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
      origin: "http://localhost:5173", // Replace with frontend URL
      credentials: true, // Allow cookies & auth headers
    })
  );

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// routes

import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

export { app };
