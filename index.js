import express from 'express';
import cors from 'cors';
import connectDB from './database/db_config.js';
import userRouter from './routers/user.router.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json())

app.get('/',(req, res)=>{
    res.status(200).json({message:"App Home Page"})
});

app.use('/api/user', userRouter);

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`App is listing in : ${process.env.PORT}`);
})