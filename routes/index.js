var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	//res.render('index.html');
	res.sendFile(path.join(__dirname, 'client/dist/index.html'))
});

module.exports = router;