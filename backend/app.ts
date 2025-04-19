import express from "express";
import authRouter from "./routes/authRoute.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

<<<<<<< HEAD

=======
>>>>>>> HomePage
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

