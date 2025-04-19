import express from "express";
import authRouter from "./routes/authRoute.js";
import transactionRoutes from './routes/transaction.routes';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", authRouter);
app.use("/transactions", transactionRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


