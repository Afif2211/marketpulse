const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken = require("../utils/generateToken");

const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const crypto = require("crypto");

const { sendPasswordResetEmail } = require("../services/emailService");

const getCookieOptions = require("../utils/cookieOptions");

const {
    validateEmail,
    validatePassword,
} = require("../utils/validators");

const googleAuth = async (req, res) => {

    try {

        const { credential } = req.body;

        if (!credential) {

            return res.status(400).json({
                success: false,
                message: "Missing Google credential",
            });

        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {
            email,
            name,
            sub: googleId,
            picture,
        } = payload;

        let user = await User.findOne({ email });

        if (user) {

            if (!user.googleId) {

                user.googleId = googleId;
                user.authProvider = "google";

                if (!user.avatar) {
                    user.avatar = picture;
                }

                await user.save();

            }

        } else {

            user = await User.create({
                fullName: name,
                email,
                googleId,
                authProvider: "google",
                avatar: picture,
            });

        }

        const token = generateToken(user._id);

        res.cookie("jwt", token, getCookieOptions());

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                walletBalance: user.walletBalance,
            },
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Google authentication failed",
        });

    }

};

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({
                success: false,
                message: "Please provide an email address",
            });

        }

        const user = await User.findOne({ email });

        // Always respond success, even if no user is found —
        // this prevents leaking which emails are registered.
        if (!user) {

            return res.status(200).json({
                success: true,
                message: "If an account exists, a reset link has been sent.",
            });

        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;

        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await sendPasswordResetEmail(user.email, resetUrl);

        res.status(200).json({
            success: true,
            message: "If an account exists, a reset link has been sent.",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;

        const { newPassword } = req.body;

        if (!newPassword) {

            return res.status(400).json({
                success: false,
                message: "Please provide a new password",
            });

        }

        if (!validatePassword(newPassword)) {

            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });

        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {

            return res.status(400).json({
                success: false,
                message: "Reset link is invalid or has expired",
            });

        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(newPassword, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const registerUser = async (req, res) => {

    try {

        const {
            fullName,
            email,
            password,
        } = req.body;

        if ( !fullName || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        if (!validateEmail(email)) {

            return res.status(400).json({
                success: false,
                message: "Invalid email address",
            });

        } 

        if (!validatePassword(password)) {

            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });

        }

        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        const user = await User.create({

            fullName,

            email,

            password: hashedPassword,

        });

        const token = generateToken(user._id);

        res.cookie("jwt", token, getCookieOptions());

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                walletBalance: user.walletBalance,
            },
        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

const loginUser = async (req, res) => {

    try {

        const {

            email,

            password,

        } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const user = await User.findOne({

            email,

        });

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid credentials",

            });

        }

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid credentials",

            });

        }

        const token = generateToken(user._id);

        res.cookie("jwt", token, getCookieOptions());

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                walletBalance: user.walletBalance,
            },
        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const logoutUser = async (req, res) => {

    res.clearCookie("jwt", getCookieOptions());

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });

};

const updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }

        const {
            fullName,
            phone,
            country,
            avatar,
        } = req.body;

        if (fullName !== undefined) {
            user.fullName = fullName;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        if (country !== undefined) {
            user.country = country;
        }

        if (avatar !== undefined) {
            user.avatar = avatar;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                country: user.country,
                avatar: user.avatar,
                walletBalance: user.walletBalance,
                role: user.role,
                createdAt: user.createdAt,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide current and new passwords",
            });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        const samePassword = await bcrypt.compare(newPassword, user.password);

        if (samePassword) {
            return res.status(400).json({
                success: false,
                message: "New password must be different from the current password",
            });
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
            newPassword,
            salt
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {

    registerUser,

    loginUser,

    getCurrentUser,

    logoutUser,

    updateProfile,

    changePassword,

    googleAuth,

    forgotPassword,

    resetPassword,

};