import express from 'express';
import todoController from '../controllers/todoController.js';
import { isLoggedIn } from '../utils/Auth.js';

const router = express.Router();

//routes

//CREATE TODO || POST
router.post('/', isLoggedIn, todoController.create);

//UPDATE TODO STATUS || PUT
router.post('/:id', isLoggedIn, todoController.completed);

//VIEW TODO || GET
router.get('/', isLoggedIn, todoController.view);

//DELETE TODO || DELETE
router.delete('/:id', isLoggedIn, todoController.delete);



export default router;