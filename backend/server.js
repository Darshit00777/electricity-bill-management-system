import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import customerRoutes from "./routes/customerRoutes.js"
import salesRoutes from "./routes/salesRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customer", customerRoutes);
app.use("/api/sales", salesRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});