import mongoose from "mongoose";

function connectDB() {
    const URL = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
    return mongoose.connect(URL);  // Return the promise
}

export default connectDB;
