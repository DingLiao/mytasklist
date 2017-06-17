var express = require('express');
var router = express.Router();
var users = require('./user.server.routes');
var tasks = require('./task.server.routes');

router.use('/users', users);
router.use('/tasks', tasks);

module.exports = router;
