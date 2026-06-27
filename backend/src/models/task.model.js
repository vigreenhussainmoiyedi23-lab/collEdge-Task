const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },
})

const taskModel = mongoose.model("task", taskSchema)

module.exports = taskModel