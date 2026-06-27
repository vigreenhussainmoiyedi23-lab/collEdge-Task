const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config()
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB connected")
}).catch((error) => {
    console.error("MongoDB connection error:", error)
})

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/tasks", require("./routes/tasks.routes.js"))
// ✅ serve frontend
const distPath = path.join(__dirname, "../public")
app.use(express.static(distPath))
app.get("*name", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"))
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})