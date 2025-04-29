import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import categoryRouter from "./routes/categoriesRoute.js";
import goalsRouter from "./routes/goalsRoute.js";
import depositRouter from "./routes/depositRoute.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import balanceRoutes from "./routes/balance.routes.js";
import storeRoutes from "./routes/storeRoutes.js";
import aiRouter from "./routes/aiRoute.js";
import { validateEnv } from "./utils/validateEnv.js";
import { supabase } from "./utils/supabaseClient.js";
import incomeRoute from "./routes/income.route.js";
import profileRoutes from "./routes/profile.route.js";
import deleteAccount from "./routes/deleteAccount.route.js";
import invoiceRoutes from "./routes/invoiceRoutes";
import transactionWithCats from './routes/transwcat.route.js'
import goalRoutes from './routes/goal.route.js'
import searchRoutes from './routes/search.route.js';
import financeRoutes from './routes/financeRoute.js';
import bodyParser from "body-parser";
dotenv.config();
validateEnv();

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

// السماح بجميع المصادر (لتطوير فقط)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/auth", authRouter);
app.use("/ai", aiRouter);
app.use("/api", balanceRoutes);
app.use("/transactions", transactionRoutes);
app.use("/categories", categoryRouter);
app.use("/goals", goalsRouter);
app.use("/deposits", depositRouter);
app.use("/api", storeRoutes);
app.use("/", incomeRoute);
app.use("/profile", profileRoutes);
app.use("/delete", deleteAccount);
app.use("/", transactionWithCats);
app.use("/", goalRoutes);
app.use("/", searchRoutes);
app.use('/finance', financeRoutes);


app.post("/", (req, res) => {
  res.send("Welcome to the backend API!");
});
app.use("/ocr", invoiceRoutes);
// التعامل مع الأخطاء بشكل عام
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
  }
);

supabase
  .from("stores")
  .select("*")
  .then(({ data, error }) => {
    if (error) console.error("Supabase Error:", error);
    // else console.log('Supabase Data:', data);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

