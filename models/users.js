import { Schema, model, models } from "mongoose";

// Define user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    isJudge: {
        type: Boolean,
        required: true,
    },
});

// Create and export User model
const User = models.User || model("User", userSchema);

module.exports = User;
