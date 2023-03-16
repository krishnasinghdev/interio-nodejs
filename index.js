import express from 'express';
import cors from 'cors';
import './db/index.js';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Message from './model/messageModal.js';

import router from './routes/index.js';

dotenv.config();
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

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (data) => {
    const message = new Message({ ...data });
    message.save((err) => {
      if (err) return console.error(err);
    });
    const d = io.to(data.to).emit('message', data);
    console.log(d);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log('Server is up on the port : ' + PORT);
});

// app.listen(PORT, () => {
//     console.log('Server is up on the port : ' + PORT)
// })