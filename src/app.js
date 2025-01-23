const express = require("express")
const userRouter = require("./routes/userRoutes")
const authRouter = require("./routes/authRoutes")
const cookieParser = require ("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)

module.exports = app
