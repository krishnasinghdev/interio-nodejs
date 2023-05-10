import express from 'express';
import cors from 'cors';
import './db/index.js';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import MESSAGE from './model/messageModal.js';
import VENDOR from './model/vendorModel.js';
import CHAT from './model/chatModel.js';
import jwt from 'jsonwebtoken';
import router from './routes/index.js';

dotenv.config();
const JWT = process.env.JWT;
const PORT = process.env.PORT;
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const httpServer = createServer(app);

app.use(cors(corsOptions));
app.use(express.json());

app.use(router);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  socket.on('new-chat', async (data) => {
    const { _id } = jwt.verify(data.token, JWT);
    const alreadychats = await CHAT.findOne({
      vendors: { $all: [_id, data.with] },
    });
    if (alreadychats.length && alreadychats.length > 0) {
      return io.emit('chat-begin', {
        chatId: alreadychats[0]._id,
      });
    }
    const chat = new CHAT({ vendors: [_id, data.with] });
    await VENDOR.findOneAndUpdate({ _id }, { socketId: socket.id });
    await chat.save((err) => {
      if (err) return console.error(err);
    });
    io.emit('chat-begin', {
      chatId: chat._id,
    });
  });

  //take userId and socketId from user
  socket.on('addUser', ({ userId }) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //send and get message
  socket.on('sendMessage', async ({ from, to, chat, content }) => {
    const user = getUser(to);
    if (user && user.socketId) {
      io.to(user.socketId).emit('getMessage', {
        sender: from,
        message: content,
      });
    }
    const message = new MESSAGE({
      sender: from,
      content,
      chat,
      readBy: [],
    });
    message.save((err) => {
      if (err) return console.error(err);
    });
    await CHAT.findOneAndUpdate({ _id: chat }, { latestMessage: message._id });
  });

  //when disconnect
  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

httpServer.listen(PORT, () => {
  console.log('Server is up on the port : ' + PORT);
});
