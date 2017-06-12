var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var tasks = require('./routes/tasks');
var index = require('./routes/index');

var port = 80;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('View engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname,'client/dist')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/', index);
app.use('/api', tasks);

// app.use('/', function(req, res){
// 	res.sendFile(path.join(__dirname, 'client/dist/index.html'))
// }) ;
app.listen(port, function(){
	console.log('Server start on port: ' + port);
})