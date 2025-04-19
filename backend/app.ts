console.log("Starting server...");
import express from "express";
import budgetRoutes from './routes/budget.routes.js';
import authRouter from './routes/auth.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use('/api', budgetRoutes);

app.post("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
