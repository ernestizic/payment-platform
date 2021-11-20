const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"],
    },
    firstname: {
        type: String,
        trim: true,
        required: [true, "Firstname is required"],
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, "Lastname is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

})

module.exports = mongoose.model("User", UserSchema)