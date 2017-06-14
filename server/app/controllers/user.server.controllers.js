var mongoose = require('mongoose');
var userService = require('../service/user.server.service');

module.exports = {
	authenticate: function(req, res, next) {
		userService.authenticate(req.body.username, req.body.password)
			.then(function(user){
				if(user) {
					return res.json(user);
				} else {
					var err = {
						msg: 'Username or password is incorrect'
					}
					return next(err);
				}
			})
			.catch(err => next(err));
	},
	register: function(req, res, next) {
		userService.create(req.body)
			.then(function() {
				return res.sendStatus(200);
			})
			.catch(err => next(err));
	},
	getById: function(req, res, next) {
		userService.getById(req.params.id)
			.then(function(user) {
				return res.json(user);
			})
			.catch(err => next(err));
	},
	getAll: function(req, res, next) {
		userService.getAll()
			.then(function(users){
				return res.json(users);
			})
			.catch(err => next(err));
	},
	update: function(req, res, next) {
		userService.update(req.params.id, req.body, next)
			.then(function() {
				return res.sendStatus(200);
			})
			.catch(err => next(err));
	},
	_delete: function(req, res, next) {
		userService.delete(req.params.id)
			.then(function() {
				return res.sendStatus(200);
			})
			.catch(err => next(err));
	}
};