const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @name registerUserController
 * @description Register a new user, expects {username, password, email} in the request body
 * @access Public 
 */
const registerUserController = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const isUserExist = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (isUserExist) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, password: hashedPassword, email });
        const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token);
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { registerUserController };