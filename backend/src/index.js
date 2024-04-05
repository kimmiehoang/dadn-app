import express from 'express';
import { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import userRouter from './router/userRouter.js';
import mongoose from 'mongoose';
import mqtt from 'mqtt';
import http from 'http';
import { Server } from 'socket.io';

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
const client = mqtt.connect('mqtt://io.adafruit.com', {
  username: 'tienhoang',
  password: '',
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('tienhoang/feeds/bbc-led');
  client.subscribe('tienhoang/feeds/bbc-fan');
});

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

client.on('message', (topic, message) => {
  console.log('Received message from Adafruit:', message.toString());
  const data = parseInt(message);
  io.sockets.emit('dataFromServer', { topic: topic, data: data });
});
/////////////////////////

app.use('/users', userRouter);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
