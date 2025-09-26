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

app.use(express.json({limit:"500gb"}))
app.use(express.urlencoded({extended:true, limit:"500gb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRoutes from './routes/user.routes.js';
import instructorRoutes from './routes/instructor.routes.js';
import courseRoutes from './routes/course.routes.js';
import sectionRoutes from './routes/section.routes.js';
import lectureRoutes from './routes/lecture.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import progressRoutes from './routes/progress.routes.js';
import reviewRoutes from './routes/review.routes.js';

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/instructor', instructorRoutes); 
app.use('/api/v1/courses',courseRoutes)
app.use('/api/v1/sections', sectionRoutes);
app.use('/api/v1/lectures', lectureRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/transaction', transactionRoutes);
app.use('/api/v1/progress', progressRoutes); 
app.use('/api/v1/reviews', reviewRoutes);  


export default app; 