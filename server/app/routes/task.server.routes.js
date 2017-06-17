var express = require('express');
var router = express.Router();
var taskController = require('../controllers/task.server.controllers');

router.get('/', taskController.getTasks);
router.post('/', taskController.create);
router.put('/:_id', taskController.update);
router.delete('/:_id', taskController.delete);

module.exports = router;