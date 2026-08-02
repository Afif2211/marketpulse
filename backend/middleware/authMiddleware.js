const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        let token = req.cookies.jwt;

        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. No token provided.",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });

    }
};

module.exports = {
    protect,
};