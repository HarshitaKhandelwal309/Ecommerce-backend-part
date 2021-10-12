const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const userSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String
    },
    Address: {
        type: String,
        trim: true,
        require: true
    },
    Contact: {
        type: String

    },
    role: {
        type: String //either user or admin here its user
    }
})

const userModel = model("userModel", userSchema);
//export usermodel to user controller
module.exports = userModel;