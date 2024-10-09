import connectDB from "./config/db.js";
import express , { Application } from "express";
import userRoutes from "./routes/userRoute.js"
import studentRoutes from "./routes/studentRoute.js"
import teacherRoutes from './routes/teacherRoute.js'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import  swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger.js';

dotenv.config();
const PORT: number | string = process.env.PORT || 3000;
const app: Application = express()
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/college', userRoutes)
app.use('/student', studentRoutes)
app.use('/teacher', teacherRoutes)

app.listen(PORT, 
    () => {console.log("server is on")})
