console.log("Starting server...");
import express from "express";
import authRouter from "./routes/authRoute.js";
import categoryRouter from "./routes/categoriesRoute.js";
import goalsRouter from "./routes/goalsRoute.js";
import depositRouter from "./routes/depositRoute.js";
const app = express();
app.use(express.json());
import cors from 'cors';

app.use(cors());
app.use("/auth", authRouter);
// app.use('/api', budgetRoutes);

app.post("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

app.use('/categories', categoryRouter);
app.use("/goals", goalsRouter);
app.use('/deposits', depositRouter);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
