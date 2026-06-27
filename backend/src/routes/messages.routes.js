const { Router } = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const messageModel = require("../models/messages.model");
const { messageValidator } = require("../validators/message.validator");
const validate = require("../validators/validate");

const router = Router()
router.get("/", isAuthenticated, async (req, res) => {
    try {
        const messages = await messageModel.find()

        return res.status(200).json({ messages })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})
router.post("/", messageValidator, validate, isAuthenticated, async (req, res) => {
    try {
        const { name, email, message } = req.body
        const newMessage = await messageModel.create({ name, email, message, user: req.user._id })
        return res.status(201).json({ newMessage, message: "Message sent successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router