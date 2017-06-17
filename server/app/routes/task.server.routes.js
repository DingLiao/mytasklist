var express = require('express');
var router = express.Router();
var taskController = require('../controllers/task.server.controllers');

router.get('/tasks/', taskController.getTasks);
router.post('/task', taskController.create);
router.put('/task/:_id', taskController.update);
router.delete('/task/:_id', taskController.delete);

module.exports = router;