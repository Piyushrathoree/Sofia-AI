import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/db.js";
import path from "path";
import express from "express";
dotenv.config({ path: "./.env" });

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "..", "client/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });
