import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/conn.mjs';
import userRouter from './routes/userRoutes.mjs';
import postRouter from './routes/postRoutes.mjs';
import commentRouter from './routes/commentRoutes.mjs';
import notificationRouter from './routes/notificationRoutes.mjs';
import friendReqRouter from './routes/friendRequestRoutes.mjs';
import seedingRouter from './routes/seedingRouter.mjs';
import globalError from './middleware/ErrorMiddleware.mjs';
import cors from 'cors';
import morgan from 'morgan';

// setup
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
app.use(morgan("tiny"));
const PORT = process.env.PORT;
connectDB();

// routes
app.get('/',(req,res)=>{
    res.json({message:`Hello World`});
});
app.use('/api/users',userRouter);
app.use('/api/posts',postRouter);
app.use('/api/comments',commentRouter);
app.use('/api/notification',notificationRouter);
app.use('/api/friendreq',friendReqRouter);
app.use('/seeding',seedingRouter);

// error handling middleware
app.use(globalError);

app.listen(PORT,(req,res)=>{
    console.log(`Listening to PORT: ${PORT}`);
});