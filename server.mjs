import { Server } from 'socket.io';
import {createServer} from 'http';
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
import registerSocketHandlers from './sockets/index.mjs';
import cors from 'cors';
import morgan from 'morgan';

// setup
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan("tiny"));
const PORT = process.env.PORT;
connectDB();

const server = createServer(app);

const io = new Server(server, { 
    cors: { 
            origin: "http://localhost:5173",
            methods : ['get','post'],
            credentials: true
     } 
});

registerSocketHandlers(io);

// routes
const routes = [
    { path: "/api/users", router: userRouter },
    { path: "/api/posts", router: postRouter },
    { path: "/api/comments", router: commentRouter },
    { path: "/api/notification", router: notificationRouter },
    { path: "/api/friendreq", router: friendReqRouter },
    { path: "/seeding", router: seedingRouter }
];

routes.forEach(({ path, router }) => app.use(path, router));

// error handling middleware
app.use(globalError);

server.listen(PORT,(req,res)=>{
    console.log(`Listening to PORT: ${PORT}`);
});