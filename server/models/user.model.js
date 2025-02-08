import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            select: false
        },
    },
    { timestamps: true }
);

userSchema.statics.hashPass=async function(password){
    return await bcrypt.hash(password , 10);
}

userSchema.methods.generateToken = function (){
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
    );                                                                                                                                                                                                                                                                                                                                                                                
}

userSchema.methods.isPasswordCorrect = async function (password ) {
    return await bcrypt.compare(password, this.password);
};


export const User = mongoose.model("User", userSchema);