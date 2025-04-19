import express from "express";
import authRouter from "./routes/authRoute.js";
const budgetRoutes = require('./routes/budget.routes');
const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use('/api/budgets', budgetRoutes);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
