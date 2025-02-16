import express from 'express';
import userController from '../controllers/userController.js';
import { isLoggedIn } from '../utils/Auth.js';

//router object
const router = express.Router();

//routes
//REGISTER || POST
router.post('/register', userController.register);

//LOGIN || POST
router.post('/login', userController.login);

//LOGOUT || POST
router.post('/logout', isLoggedIn, userController.logout);

//CHECK AUTH || GET
router.get('/checkauth', userController.checkAuth);

//USER PROFILE || GET
router.get('/profile', isLoggedIn, userController.getProfile);

//export
export default router;