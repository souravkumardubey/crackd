const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "username already taken"]
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email already taken"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },

});

const User = mongoose.model("users", userSchema);
module.exports = User;
