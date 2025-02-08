import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const AuthenticateUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
};

export default AuthenticateUser;
