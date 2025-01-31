import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    const { firstName, lastName = "", email, password } = req.body;
    if (!firstName || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "Already a user, please login" });
    }

    const hashedPass = await User.hashPass(password);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPass,
    });

    if (!newUser) {
        return res
            .status(400)
            .json({ message: "Something went wrong while signup" });
    }
    // Save the new user before returning a response
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email }).select("-password");
    if (!existingUser) {
        return res
            .status(400)
            .json({ message: "User not found, please signUp" });
    }

    const token = await existingUser.generateToken();
    if (!token) {
        return res.status(400).json({ message: "Token not found" });
    }
    // Set token in localStorage

    res.status(200)
        .cookie("token", token, {
            httpOnly: true, // Prevent access from JavaScript
            sameSite: "Strict", // Prevent CSRF
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .json({
            message: "Login successful",
            token,
            existingUser,
            localStorageToken: `localStorage.setItem('token', '${token}')`,
        });
};

const logoutUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ message: "Already logged out" });
    }

    res.clearCookie("token").status(200).json({
        message: "User logged out successfully",
        localStorageToken: "localStorage.removeItem('token')",
    });
};

const getUserProfile = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ success: true, user: user });
};

export { registerUser, loginUser, logoutUser, getUserProfile };
