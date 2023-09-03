const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/api/tasks')

router.get('/', tasksCtrl.getTask);
router.post('/', tasksCtrl.saveTask);
router.delete('/:id', tasksCtrl.deleteTask);
router.put('/:id', tasksCtrl.updateTask);

module.exports = router;