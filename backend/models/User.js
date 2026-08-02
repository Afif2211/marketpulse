const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: function () {
                return !this.googleId;
            },
        },

        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },

        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },

        resetPasswordToken: {
            type: String,
        },

        resetPasswordExpires: {
            type: Date,
        },

        aiInsights: {
            summary: {
                type: String,
                default: "",
            },
            insights: {
                type: [mongoose.Schema.Types.Mixed],
                default: [],
            },
            generatedAt: {
                type: Date,
            },
        },

        phone: {
            type: String,
            default: "",
            trim: true,
        },

        country: {
            type: String,
            default: "",
            trim: true,
        },

        avatar: {
            type: String,
            default: "",
        },

        walletBalance: {
            type: Number,
            default: 10000,
            min: 0,
        },

        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);