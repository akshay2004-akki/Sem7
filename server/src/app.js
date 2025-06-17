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
import instructorRoutes from './routes/instructor.routes.js';
import courseRoutes from './routes/course.routes.js';

app.use('/api/v1/users', userRoutes);
app.use('api/v1/instructor', instructorRoutes);
app.use('/api/v1/courses',courseRoutes)

export default app;