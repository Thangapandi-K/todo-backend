import Todo from "../models/todoModel.js";


const todoController = {

    //create todo
    create: async(request, response) => {
        try {
            const {todo, userId} = request.body;
            if(!todo || !userId) {
                return response.status(400),json({success: false, message: "Provide All Details !"});
            };
            const newTodo = new Todo({
                todo,
                userId
            });
            await newTodo.save();
            return response.status(201).json({success: true, message: "Todo Created Successfully !"});            
        } catch (error) {
            return response.status(400).json({success: false, message: error.message});
        }
    },

    //view todo
    view: async(request, response) => {
        try {
            const {userId} = request.body;
            const todos = await Todo.find({userId}).populate('userId', 'username email', 'users');
            if(!todos) {
                return response.status(200).json({success: true, message: "No Todos Created !"});
            };
            return response.status(200).json({success: true, message: "Todos Fetched Successfully !", todos});
        } catch (error) {
            return response.status(400).json({success: false, message: error.message});
        }
    },

    //delete todo
    delete: async(request, response) => {
        try {
            const todoId = request.params.id;
            const {userId} = request.body;
            const todo = await Todo.findById(todoId);
            if(todo.userId == userId) {
                await Todo.findByIdAndDelete(todoId);
                return response.status(200).json({success: false, message: "Todo Deleted Successfully !"});
            };
        } catch (error) {
            return response.status(400).json({success: false, message: error.message});
        }
    },

    //todo completed
    completed: async(request, response) => {
        try {
            const todoId = request.params.id;
            const {userId} = request.body;
            const todo = await Todo.findById(todoId);
            if(todo.userId == userId) {
                todo.isCompleted 
                ? await Todo.findByIdAndUpdate(todoId, {isCompleted: false})
                : await Todo.findByIdAndUpdate(todoId, {isCompleted: true})

                return response.status(200).json({success: true, message: "Todo Updated Successfully !"});
            };
        } catch (error) {
            return response.status(400).json({success: false, message: error.message});
        }
    }
};

export default todoController;