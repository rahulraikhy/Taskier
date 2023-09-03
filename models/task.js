const mongoose = require("mongoose");



const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['not started', 'In Progress', 'completed'],
        default: 'not started'
    },
    urgency: {
        type: String,
        enum: ['1', '2', '3', '4', '5'],
        default: '1'
    },
    description: {
        type: String,
        maxlength: 1000,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('task', taskSchema)