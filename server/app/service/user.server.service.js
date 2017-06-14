var mongoose = require('mongoose');
var User = require('../models/user.server.model');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var Q = require('q');
var defer = Q.defer();

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
	User.findOne({username: username}, function(err, user) {
		if(err) defer.reject(err.name + ':' + err.message);

		if(user && bcrypt.compareSync(password, user.password)) {
			defer.resolve(user);
		} else {
			defer.resolve();
		}
	});

	return defer.promise;
}

function getAll() {
	User.find({}, function(err, users){
		if(err) defer.reject(err.name + ':' + err.message);

		console.log("users: " + users);
		users=_.map(users, function(user){
			return _.omit(user, 'password');
		});

		defer.resolve(users);
	});

	return defer.promise;
}

function getById(_id) {
	User.findById(_id, function(err, user) {
		if(err) defer.reject(err.name + ':' + err.message);

		if(user) {
			// username already exists
            defer.resolve(_.omit(user, 'password'));
		}
		else {
			defer.resolve();
		}
	});

	return defer.promise;
}

function create(userParam) {
	User.findOne({username: username}, function(err, user) {
		if(err) defer.reject(err.name + ':' + err.message);

		if (user) {
            // username already exists
            defer.reject('Username "' + userParam.username + '" is already taken');
        } else {
            createUser();
        }
	});

	function createUser() {
		var user = new User(userParam);

        // add hashed password to user object
        user.password = bcrypt.hashSync(userParam.password, 10);

        user.save(function(err, result) {
			if(err) {
				if (err) defer.reject(err.name + ': ' + err.message);
			}
			efer.resolove();
		});
	}

	return defer.promise;
}

function update(_id, userParam) {
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
	User.findByIdAndRemove(_id, function(err, user) {
		if(err) {
			defer.reject(err.name + ': ' + err.message);
		}
		defer.resolve();
	});

	return defer.promise;
}

