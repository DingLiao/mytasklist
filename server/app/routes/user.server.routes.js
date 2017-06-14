var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.server.controllers');

router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController._delete);

module.exports = router;
