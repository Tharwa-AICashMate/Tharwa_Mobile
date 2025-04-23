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
// تحميل متغيرات البيئة من ملف .env
dotenv.config();

// التحقق من صحة بيئة التطبيق
validateEnv();

// إنشاء تطبيق Express
const app = express();

// إعداد CORS للسماح بالوصول من مصادر معينة إذا لزم الأمر
app.use(cors());

// تعريف مسارات الـ API
app.use(express.json());
app.use("/auth", authRouter);
app.use("/ai", aiRouter);
app.use("/api", balanceRoutes);
app.use("/transactions", transactionRoutes);
app.use("/categories", categoryRouter);
app.use("/goals", goalsRouter);
app.use("/deposits", depositRouter);
app.use("/api", storeRoutes);

// الرسالة الافتراضية عند الوصول إلى الجذر
app.post("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

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

// الاتصال بقاعدة بيانات Supabase واستخراج البيانات من جدول "stores"
supabase
  .from("stores")
  .select("*")
  .then(({ data, error }) => {
    if (error) console.error("Supabase Error:", error);
    // else console.log('Supabase Data:', data);
  });

// تشغيل السيرفر على المنفذ المطلوب
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
