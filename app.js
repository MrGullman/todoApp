var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// setup templateengine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

// Listen to port
app.listen(3000);
console.log('Du lyssnar på port 3000');
