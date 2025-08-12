import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './Routes/AuthRouter.js';
import ProductRouter from './Routes/ProductRouter.js'
import './Models/db.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

app.get('/pong', (req,res)=>{
    res.send('PONG')
})

app.use(express.json());

// Invalid JSON handler
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON' });
    }
    next();
});

app.use(cors())
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

app.listen(PORT, ()=>console.log(`server is running on ${PORT}`))