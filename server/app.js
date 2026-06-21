import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import wardRoutes from "./routes/ward.routes.js"; 

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', wardRoutes);


export default app; 