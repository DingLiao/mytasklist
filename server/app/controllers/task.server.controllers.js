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
		var task = new Task(req.body);
		Task.findByIdAndUpdate(req.params._id, task, function(err, task) {
			if(err) {
				return next(err);
			}
			return res.json(task);
		})
	},
	delete: function(req, res, next) {
		console.log("delete, id: " + req);
		Task.findByIdAndRemove(req.params._id, function(err, task){
			if(err) {
				return next(err);
			}
			return res.json(task);
			
		});
	}
};