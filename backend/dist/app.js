"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_js_1 = __importDefault(require("./routes/authRoute.js"));
const categoriesRoute_js_1 = __importDefault(require("./routes/categoriesRoute.js"));
const goalsRoute_js_1 = __importDefault(require("./routes/goalsRoute.js"));
const depositRoute_js_1 = __importDefault(require("./routes/depositRoute.js"));
const transactionRoutes_js_1 = __importDefault(require("./routes/transactionRoutes.js"));
const balance_routes_js_1 = __importDefault(require("./routes/balance.routes.js"));
const storeRoutes_js_1 = __importDefault(require("./routes/storeRoutes.js"));
const aiRoute_js_1 = __importDefault(require("./routes/aiRoute.js"));
const validateEnv_js_1 = require("./utils/validateEnv.js");
const supabaseClient_js_1 = require("./utils/supabaseClient.js");
const income_route_js_1 = __importDefault(require("./routes/income.route.js"));
const profile_route_js_1 = __importDefault(require("./routes/profile.route.js"));
const deleteAccount_route_js_1 = __importDefault(require("./routes/deleteAccount.route.js"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const transwcat_route_js_1 = __importDefault(require("./routes/transwcat.route.js"));
const goal_route_js_1 = __importDefault(require("./routes/goal.route.js"));
const search_route_js_1 = __importDefault(require("./routes/search.route.js"));
const financeRoute_js_1 = __importDefault(require("./routes/financeRoute.js"));
const body_parser_1 = __importDefault(require("body-parser"));
const ragService_js_1 = __importDefault(require("./services/ragService.js"));
dotenv_1.default.config();
(0, validateEnv_js_1.validateEnv)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "10mb" }));
// السماح بجميع المصادر (لتطوير فقط)
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use("/auth", authRoute_js_1.default);
app.use("/ai", aiRoute_js_1.default);
app.use("/api", balance_routes_js_1.default);
app.use("/transactions", transactionRoutes_js_1.default);
app.use("/categories", categoriesRoute_js_1.default);
app.use("/goals", goalsRoute_js_1.default);
app.use("/deposits", depositRoute_js_1.default);
app.use("/api", storeRoutes_js_1.default);
app.use("/", income_route_js_1.default);
app.use("/profile", profile_route_js_1.default);
app.use("/delete", deleteAccount_route_js_1.default);
app.use("/", transwcat_route_js_1.default);
app.use("/", goal_route_js_1.default);
app.use("/", search_route_js_1.default);
app.use('/finance', financeRoute_js_1.default);
app.post("/", (req, res) => {
    res.send("Welcome to the backend API!");
});
app.use("/ocr", invoiceRoutes_1.default);
// التعامل مع الأخطاء بشكل عام
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message: "Something broke!" });
});
supabaseClient_js_1.supabase
    .from("stores")
    .select("*")
    .then(({ data, error }) => {
    if (error)
        console.log("Supabase Error:", error);
    // else console.log('Supabase Data:', data);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await ragService_js_1.default.initialize();
    console.log(`Server running on port ${PORT}`);
});
