import mongoose from "mongoose";

//schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true});

//export
const User = mongoose.model('users', userSchema);
export default User;