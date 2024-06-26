import express from 'express';
import { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import userRouter from './router/userRouter.js';
import homeRouter from './router/homeRouter.js';
import deviceRouter from './router/deviceRouter.js';
import mongoose from 'mongoose';
import mqtt from 'mqtt';
import http from 'http';
import { Server } from 'socket.io';

let usernameAdafruit = '';
let keyAdafruit = '';

mongoose.connect('mongodb://127.0.0.1:27017/smartHome', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Fail to connect MongoDB:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
const port = 5000;

app.use(json());
app.use(cors());

/////////////////////////
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

console.log(usernameAdafruit);
console.log(keyAdafruit);

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('update-adafruit', (newData) => {
    // newData là dữ liệu được gửi từ client
    const { username, password } = newData;

    // Cập nhật dữ liệu và kết nối lại MQTT client nếu cần thiết
    usernameAdafruit = username;
    keyAdafruit = password;
    const client = mqtt.connect('mqtt://io.adafruit.com', {
      username: usernameAdafruit,
      password: keyAdafruit,
    });

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('tienhoang/feeds/bbc-led');
      client.subscribe('tienhoang/feeds/bbc-fan');
      client.subscribe('tienhoang/feeds/bbc-temp');
    });

    client.on('message', (topic, message) => {
      console.log('Received message from Adafruit:', message.toString());
      const data = parseInt(message);
      io.sockets.emit('dataFromServer', { topic: topic, data: data });
    });
  });
});

/////////////////////////
app.use('/users', userRouter);
app.use('/homes', homeRouter);
app.use('/devices', deviceRouter);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
