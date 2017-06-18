var taskService = require('../service/task.server.service');
var config = require('../../config/env/development');
var Task = require('../models/task.server.model');
var jwt = require('jsonwebtoken');

module.exports = {
	getTasks: function(req, res, next) {
		let creatorId = req.user.userId;
		taskService.getAll(creatorId)
			.then(function(tasks) {
				return res.json(tasks);
			})
			.catch(err => next(err));
	},
	create: function(req, res, next) {
		let creatorId = req.user.userId;
		console.log("create task: " + JSON.stringify(req.body));
		let task = new Task(req.body);
		taskService.create(creatorId, task)
			.then(function() {
				return res.json(task);
			})
			.catch(err => next(err));
	},
	update: function(req, res, next) {
		let task = new Task(req.body);
		taskService.update(task)
			.then(function() {
				return res.json(task);
			})
			.catch(err => next(err));
	},
	delete: function(req, res, next) {
		console.log("delete, id: " + req.params._id);
		taskService.delete(req.params._id)
			.then(function() {
				return res.sendStatus(200);
			})
			.catch(err => next(err));
	}
};