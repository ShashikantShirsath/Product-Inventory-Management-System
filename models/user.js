const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: { createdAt: "created_at", } });

module.exports = mongoose.model("User", userSchema);