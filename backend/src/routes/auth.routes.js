const { Router } = require("express")
const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const router = Router()
const jwt = require("jsonwebtoken")
const { registerValidator, loginValidator } = require("../validators/auth.validator")
const validate = require("../validators/validate")

router.post("/login", loginValidator, validate, async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 60 * 60 * 1000,
        })
        return res.status(200).json({ message: "Login successful" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/register", registerValidator, validate, async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ name, email, password: hashedPassword })
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 60 * 60 * 1000,
        })
        return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})
router.get("/logout", (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({ message: "Logout successful" })
})
router.get("/get-me", async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)

        return res.status(200).json({ user, role: user.role })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router