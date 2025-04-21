// console.log("Starting server...");
// import express from "express";
// import authRouter from "./routes/authRoute.js";
// import categoryRouter from "./routes/categoriesRoute.js";
// import goalsRouter from "./routes/goalsRoute.js";
// import depositRouter from "./routes/depositRoute.js";


// import dotenv from 'dotenv';
// import transactionRoutes from './routes/transactionRoutes';
// dotenv.config();
// const app = express();
// app.use(cors());

// app.use(express.json());
// import cors from 'cors';

// app.use(cors());
// app.use("/auth", authRouter);
// // app.use('/api', budgetRoutes);

// app.post("/", (req, res) => {
//   res.send("Welcome to the backend API!");
// });

// app.use('/categories', categoryRouter);
// app.use("/goals", goalsRouter);
// app.use('/deposits', depositRouter);

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// app.use('/transactions', transactionRoutes);
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something broke!' });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// console.log("Starting server...");

// import express from "express";
// // import authRouter from "./routes/authRoute.js";
// import categoryRouter from "./routes/categoriesRoute.js"
// import goalsRouter from "./routes/goalsRoute.js";
// import depositRouter from "./routes/depositRoute.js";
// import dotenv from "dotenv";
// import transactionRoutes from "./routes/transactionRoutes.js";
// import cors from "cors";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// // app.use("/auth", authRouter);
// app.use("/categories", categoryRouter);
// app.use("/goals", goalsRouter);
// app.use("/deposits", depositRouter);
// app.use("/transactions", transactionRoutes);

// // Default route
// app.post("/", (req, res) => {
//   res.send("Welcome to the backend API!");
// });

// // Error handler middleware
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something broke!" });
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// console.log("Starting server...");
// import express from "express";
// import authRouter from "./routes/authRoute.js";
// import categoryRouter from "./routes/categoriesRoute.js";
// import goalsRouter from "./routes/goalsRoute.js";
// import depositRouter from "./routes/depositRoute.js";
// import transactionRoutes from './routes/transaction.routes.js';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/auth", authRouter);
// app.use('/categories', categoryRouter);
// app.use("/goals", goalsRouter);
// app.use('/deposits', depositRouter);
// app.use('/transactions', transactionRoutes);

// // Default route
// app.post("/", (req, res) => {
//   res.send("Welcome to the backend API!");
// });

// Error handler
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something broke!' });
// });

// Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
console.log("Starting server...");
import express from "express";
import authRouter from "./routes/authRoute.js";
import categoryRouter from "./routes/categoriesRoute.js";
import goalsRouter from "./routes/goalsRoute.js";
import depositRouter from "./routes/depositRoute.js";
import transactionRoutes from "./routes/transactionRoutes.js";
const app = express();
app.use(express.json());
import cors from 'cors';
import budgetRoutes from "./routes/budget.routes.js";

app.use(cors());
app.use("/auth", authRouter);
app.use('/api', budgetRoutes);
app.use('/transactions', transactionRoutes);
app.post("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

app.use('/categories', categoryRouter);
app.use("/goals", goalsRouter);
app.use('/deposits', depositRouter);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
