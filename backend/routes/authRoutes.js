const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    updateProfile,
    changePassword,
    googleAuth,
    forgotPassword,
    resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/google", googleAuth);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/me", protect, getCurrentUser);

router.put("/profile", protect, updateProfile);

router.post("/logout", logoutUser);

router.put("/change-password", protect, changePassword);

module.exports = router;