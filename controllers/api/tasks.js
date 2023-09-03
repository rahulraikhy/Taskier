const TaskModel = require('../../models/task');


async function getTask(req, res) {
    const Task = await TaskModel.find({ user: req.user._id });
    res.send(Task);
}

async function saveTask(req, res) {

    try {
        const newTask = await TaskModel.create({ ...req.body, user: req.user._id });
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding task' });
    }
}

async function deleteTask(req, res) {
    const { task, status, description } = req.body;
    const taskId = req.params.id;

    try {
        await TaskModel.findByIdAndDelete(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'Error deleting task' });
    }
}

async function updateTask(req, res) {
    const { task, status, description, urgency } = req.body; // Added urgency
    const taskId = req.params.id;

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            { task, status, description, urgency }, // Include urgency for update
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ message: 'Error updating task' });
    }
}

module.exports = {
    getTask,
    saveTask,
    deleteTask,
    updateTask,
}