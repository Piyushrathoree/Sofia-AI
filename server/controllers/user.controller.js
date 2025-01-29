
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    const { firstName, lastName="", email, password } = req.body;
    if (!firstName || !email || !password) {
        return res.status(401).json({message:"please fill all the feilds"})
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(401).json({message:"already a user , please login"})
    }

    const hashedPass = await User.hashPass(password);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password : hashedPass
    })
    if(!newUser){
        return res.status(401).json({message:"something went wrong while signup"})
    }

    res.status(200).json({message:"user created successfully"} , newUser)
};

const loginUser = async (req, res) =>{
    const {email , password}= req.body;
    if (!email || !password) {
        return res.status(401).json({message:"please fill all the feilds"})
    }
    const existingUser = await User.findOne({email}).select("-password");
    if(!existingUser){
        return res.status(401).json({message:"user not found , please signUp"})
    }
    const token = await User.generateToken()
    if(!token){
        return res.status(401).json({message:"token not found"})
    }
    res.status(200).cookies("token", token).json({message:"user created successfully"} ,{token}, {newUser})
}

const logoutUser = async (req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"already logged out"})
    }
    res.clearCookie("token").json({message:"user logged out successfully"})
}

export { registerUser, loginUser, logoutUser }