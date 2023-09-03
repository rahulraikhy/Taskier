const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/api/tasks')

router.get('/', tasksCtrl.getTasks);
router.post('/', tasksCtrl.createTask);
router.delete('/:id', tasksCtrl.removeTask);
router.put('/:id', tasksCtrl.editTask);

module.exports = router;