const { Router } = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const taskModel = require("../models/task.model");
const { messageValidator, taskValidator } = require("../validators/message.validator");
const validate = require("../validators/validate");

const router = Router()

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const tasks = await taskModel.find({ user: req.user._id })
        return res.status(200).json({ tasks })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/", taskValidator, isAuthenticated, async (req, res) => {
    try {
        const { title, description, priority } = req.body
        const newTask = await taskModel.create({ title, description, priority, user: req.user._id })
        return res.status(201).json({ newTask, message: "Task created successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.put("/:id", taskValidator, isAuthenticated, async (req, res) => {
    try {
        const { title, description, priority } = req.body
        const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, { title, description, priority }, { new: true })
        return res.status(200).json({ updatedTask, message: "Task updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/:id/:status", isAuthenticated, async (req, res) => {
    try {
        const { status } = req.params
        const validStatuses = ["toDo", "in-progress", "completed"]
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" })
        }
        const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, { status }, { new: true })
        return res.status(200).json({ updatedTask, message: "Task status updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router