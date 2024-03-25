// Import thư viện Express
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import userRouter from './router/userRouter.js';

const app = express();
const port = 5000;

app.use(json());
app.use(cors());

app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
