import express from 'express';
import 'dotenv/config';
import connectDB from './config/database.js';
import cors from 'cors';
import cookieparser from 'cookie-parser'
import colors from 'colors';
import testRouter from './routes/testRoutes.js';
import userRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import requestLogger from './utils/logger.js';

const app = express();

//middlewares
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(cookieparser());
app.use(express.json());
app.use(requestLogger);


//routes
app.get('/', (request, response) => {
    return response.json({message: "Hello Boy !"})
})
app.use('/api/v1', testRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/todo', todoRouter);

export default app;
