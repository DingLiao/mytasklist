var mongoose = require('mongoose');
var User = require('../models/user.server.model');
var Task = require('../models/task.server.model');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var Q = require('q');

var service = {};

service.getById = getById;
service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll(creatorId) {
	var defer = Q.defer();
	console.log("task.server.service, getAll: " + creatorId);

	Task.findByCreatorId(creatorId, function(err, tasks) {
		if(err) defer.reject(err.name + ':' + err.message);

		defer.resolve(tasks);
	});

	return defer.promise;
}

function getById(_id) {
	var defer = Q.defer();

	Task.findById(_id, function(err, task) {
		if(err) defer.reject(err.name + ':' + err.message);

		if(user) {
            defer.resolve(task);
		}
		else {
			defer.resolve();
		}
	});

	return defer.promise;
}

function create(creatorId, task) {
	var defer = Q.defer();
	task.creator_id = creatorId;
	task.save(function(err, user) {
		if(err) {
			if (err) defer.reject(err.name + ': ' + err.message);
		}
		defer.resolve(user);
	});

	return defer.promise;
}

function update(_id, userParam) {
	var defer = Q.defer();

	User.findById(_id, function(err, user) {
		if(err) defer.reject(err.name + ':' + err.message);

		if( user.username !== userParam.username) {
			User.findOne({username: userParam.username}, function(err, user) {
				if(err) defer.reject(err.name + ':' + err.message);

				if(user) {
					// username already exists
                    defer.reject('Username "' + req.body.username + '" is already taken');
				}
				else {
					updateUser();
				}
			});
		} else {
			updateUser();
		}
	});

	function updateUser() {
		var user = new User(userParam);
		user = _.omit(user, "_id");

		User.findByIdAndUpdate(_id, user, function(err, user) {
			if(err) {
				defer.reject(err.name + ': ' + err.message);
			}
			defer.resolve();
		})
	}

	return defer.promise;
}

function _delete(_id) {
	var defer = Q.defer();

	Task.findByIdAndRemove(_id, function(err, task) {
		if(err) {
			defer.reject(err.name + ': ' + err.message);
		}
		defer.resolve();
	});

	return defer.promise;
}