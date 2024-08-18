import mongoose, { Mongoose } from "mongoose";

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://mandeepchetry6969:Gomagni%40123@cluster0.mkrcx02.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 20,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}