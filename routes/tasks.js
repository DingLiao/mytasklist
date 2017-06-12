var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tasks');
var Task = require('../models/task');


router.get('/tasks', function(req, res, next) {
	Task.find(function(err, tasks) {
		if(err) {
			res.send(err);
		}
		res.json(tasks);
	});
});

router.get('/task/:id', function(req, res, next) {
	Task.findOne({_id: mongoose.Types.ObjectId(req.params.id )}, function(err, task) {
		if(err) {
			res.send(err);
		}
		res.json(task);
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
				res.send(err);
			}
			res.json(task);
		});
	}
});

//Delete Task
router.delete('/task/:id', function(req, res, next) {
	Task.findByIdAndRemove(req.params.id, function(err, task){
		if(err) {
			res.send(err);
		}
		res.json(task);
	})
});

//Update Task
router.put('/task/:id', function(req, res, next) {
	var task = new Task(req.body);
	console.log(task);
	Task.findByIdAndUpdate(req.params.id, task, function(err, task) {
		if(err) {
			res.status(500).send(err)
		}
		res.json(task);
	})
});

module.exports = router;