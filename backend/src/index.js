// Import thư viện Express
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import User from './model/userModel.js';

const app = express();
const port = 3000;

app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('DADN!');
});

const user = new User();
const list = user.findAll();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
