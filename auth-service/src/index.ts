import dotenv from 'dotenv';
import express from 'express';
import userRouter from './routes/auth';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', userRouter);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🔥 Auth Service running on port ${PORT}`));
