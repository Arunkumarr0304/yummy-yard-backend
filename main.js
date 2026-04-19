import express from "express";
import cors from "cors";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 6969;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to yummy-yard backend" });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}`);
});
