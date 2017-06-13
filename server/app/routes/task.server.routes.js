var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../models/task.server.model');


router.get('/tasks', function(req, res, next) {
	Task.find(function(err, tasks) {
		if(err) {
			return next(err);
		}
		return res.json(tasks);
	});
});

router.get('/task/:id', function(req, res, next) {
	Task.findOne({_id: mongoose.Types.ObjectId(req.params.id )}, function(err, task) {
		if(err) {
			return next(err);
		}
		return res.json(task);
	});
});


router.post('/task', function(req, res, next) {
	console.log(req.body);
	var task = new Task(req.body);
	if(!task.title || !(task.isDone + '')) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		task.save(function(err, result) {
			if(err) {
				return next(err);
			}
			return res.json(task);
		});
	}
});

//Delete Task
router.delete('/task/:id', function(req, res, next) {
	Task.findByIdAndRemove(req.params.id, function(err, task){
		if(err) {
			return next(err);
		}
		return res.json(task);
	})
});

//Update Task
router.put('/task/:id', function(req, res, next) {
	var task = new Task(req.body);
	console.log(task);
	Task.findByIdAndUpdate(req.params.id, task, function(err, task) {
		if(err) {
			return next(err);
		}
		return res.json(task);
	})
});

module.exports = router;