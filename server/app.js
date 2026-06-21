import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import wardRoutes from "./routes/ward.routes.js"; 

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allow requests from the specified origin
    credentials: true
}));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

app.use('/api/v1', wardRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    return res.status(statusCode).json({
        statusCode,
        message,
        success: false,
        errors: err.errors || []
    })
})


export default app; 