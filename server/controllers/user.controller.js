import { User } from "../models/user.model.js";

const   registerUser = async (req, res) => {
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
    return res.status(201).json({ message: "User created successfully" });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return res
                .status(400)
                .json({ message: "User not found, please signUp" });
        }
        const isMatch = await existingUser.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(400).json({ message : "invalid credentials"});
        }
        const token = await existingUser.generateToken();
        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }
        // Set token in localStorage
    
        return res
            .status(200)
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
    } catch (error) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
};

const logoutUser = async (req, res) => {
    const token = req.cookies;
    if (!token) {
        return res.status(400).json({ message: "Already logged out" });
    }
    res.clearCookie("token");

    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};

const getUserProfile = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({ success: true, user: user });
};

const updateProfile = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { firstName, lastName } = req.body;
    if (!firstName && !lastName) {
        return res
            .status(400)
            .json({ message: "Please provide new first name or last name" });
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    await user.save();
    return res.json({ success: true, user });
};

const updatePassword = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res
            .status(400)
            .json({ message: "Please provide all the fields" });
    }
    const isMatch = await user.isPasswordCorrect(currentPassword);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid current password" });
    }
    const hashedPass = await User.hashPass(newPassword);
    user.password = hashedPass;
    await user.save();
    return res.json({
        success: true,
        message: "Password updated successfully",
    });

};

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateProfile,
    updatePassword,
};
