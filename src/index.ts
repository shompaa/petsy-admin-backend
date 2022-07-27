import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { dbConnection } from './database';
import { authRouter, productsRouter, usersRouter } from './routes';
import { errorHandler } from './utils';

const app = express();
dbConnection();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/test', (_req, res) => {
    res.send('Hello World!');
});

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});