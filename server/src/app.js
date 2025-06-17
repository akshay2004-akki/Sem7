import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

dotenv.config({
    path:"./.env"
})

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRoutes from './routes/user.routes.js';


app.use('/api/v1/users', userRoutes);

export default app;