import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import userRoute from './routes/users.routes.js'
import cors from 'cors'
import path from 'path';
const app = express()
dotenv.config('./.env')
app.use(express.json());


const __dirname = path.resolve();

const corsOptions = {
    origin: 'https://globewick.onrender.com',
    methods: "POST,GET,HEAD,PUT,PATCH,DELETE",
    credentials: true
};
app.use(cors(corsOptions));
app.use('/api/auth',userRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

connectDB().then(app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log(`server running at port ${process.env.PORT  || 5000}`);
    
}))
