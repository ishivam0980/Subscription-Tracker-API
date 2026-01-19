import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectDB  from './config/db.js'

dotenv.config({ path: '.env.local' });//dotenv.config() by default looks for .env file

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


connectDB();

//Routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);


const PORT=process.env.PORT||3000;


app.get('/',(req,res)=>res.send("Welcome To Subscription Tracker API"))


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});