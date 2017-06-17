var userService = require('../service/user.server.service');
var config = require('../../config/env/development');
var jwt = require('jsonwebtoken');

module.exports = {
	authenticate: function(req, res, next) {
		userService.authenticate(req.body.username, req.body.password)
			.then(function(user){
				if(user) {
					return res.json({
						_id: user._id,
						username: user.username,
						token: jwt.sign({userId: user._id}, config.sessionsecret)
					});
				} else {
					return res.status(403).json({ err: 'Username or password is incorrect'});
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
		console.log('getById');
		userService.getById(req.params.id)
			.then(function(user) {
				return res.json(user);
			})
			.catch(err => next(err));
	},
	getAll: function(req, res, next) {
		console.log('getAll');
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