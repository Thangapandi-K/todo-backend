import express from 'express';
import testingController from '../controllers/testController.js';

//router object
const router = express.Router();

//routes
router.get('/test', testingController.testing);

//exports
export default router;