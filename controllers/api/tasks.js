const TaskModel = require('../../models/task');

async function getTasks(req, res) {
    try {
        const tasks = await TaskModel.find({ user: req.user._id });
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
}

async function createTask(req, res) {
    try {
        const newTask = await TaskModel.create({ ...req.body, user: req.user._id });
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (err) {
        res.status(500).json({ message: 'Error adding task' });
    }
}

async function removeTask(req, res) {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task' });
    }
}

async function editTask(req, res) {
    const { task, status, description, urgency } = req.body;

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { task, status, description, urgency },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (err) {
        res.status(500).json({ message: 'Error updating task' });
    }
}

module.exports = {
    getTasks,
    createTask,
    removeTask,
    editTask,
}
