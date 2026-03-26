import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOption));

// ✅ Static uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ API Routes
app.use("/api/users", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

// ✅ Frontend static (React build)
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// ❌ app.get("*") hata diya (Express 5 me error deta hai)

// ✅ Catch-all route (React SPA support)
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// ✅ DB connect + server start
connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log("✅ Server running on port 3000");
        });
    })
    .catch(err => {
        console.log("❌ DB Connection Error:", err);
    });