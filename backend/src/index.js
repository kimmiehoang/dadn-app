// Import thư viện Express
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import userRouter from './router/userRouter.js';
import mongoose from 'mongoose';

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

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
