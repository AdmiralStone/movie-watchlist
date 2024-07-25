// server/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import watchlistRoutes from './routes/watchlist.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors({
    origin:'*',
    optionsSuccessStatus:200,
}));

app.use(express.json());

app.use('/api/watchlist',watchlistRoutes);

app.get('/', (req,res) =>{
    res.send('Hello, World!');
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})