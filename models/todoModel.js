import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

const Todo = mongoose.model('todos', todoSchema);

export default Todo;  
