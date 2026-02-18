const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
    try {
        let { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        let existingUser = await User.findOne({ email});
        if(existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                email: newUser.email,
            }
        })
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        let user = await User.findOne({ email});
        if(!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        let token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
            }
        })
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};