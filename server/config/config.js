var config = null;

if(process && process.env && process.env.NODE_ENV) {
	console.log('use NODE_ENV config: ' + './env/' + process.env.NODE_ENV + '.js');
	config = require('./env/' + process.env.NODE_ENV + '.js');
} else {
	console.log('use development config: ' + './env/development.js');
	config = require('./env/development.js');
}

module.exports = config;