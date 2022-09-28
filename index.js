import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import cors from 'cors';

import { Server } from 'socket.io';

import { login, recipient } from './controllers/auth.js';
import { getAllUsers } from './controllers/users.js';
import {
	createPost,
	getAllMessageByUserId,
	getSentMessagesToUser,
} from './controllers/post.js';
import { userConnected, userDisConnected } from './socket/users.js';

const PORT = process.env.PORT || 3001;

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB is OK'))
	.catch(() => console.log('DB error'));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3002',
	},
});
app.use(cors());
app.use(express.json());

io.on('connection', socket => {
	console.log(socket.id);

	socket.on('sent_message', data => {
		console.log(data);
		socket.to(data.toId).emit('recv_message', data);
		// console.log(data);
		// socket.to(data.sender).emit('recv_message', data);
	});

	socket.on('disconnect', () => {
		console.log(`user id = ${socket.id} disconnected`);
	});
});

app.get('/', (req, res) => res.json({ message: 'hello' }));

app.post('/auth/login', login);
app.post('/auth/recipient', recipient);
app.get('/users', getAllUsers);
app.post('/posts', createPost);
app.post('/incoming-messages', getAllMessageByUserId);
app.post('/sent-messages', getSentMessagesToUser);

server.listen(PORT, err =>
	err ? console.log(err) : console.log(`Server started on ${PORT}`)
);
