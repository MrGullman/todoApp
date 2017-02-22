var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Conect to database
//mongoose.connect('mongodb://test:test@ds031883.mlab.com:31883/todo');
mongoose.connect('mongodb://62.119.70.55:27017/todo');

// Create schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);


// var data = [{item: 'Get milk'}, {item: 'Play ball'}, {item: 'Kick som coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo', function(req, res){
    // Hämta dat från mongoDb och skicka det till view
    Todo.find({}, function(err, data) { // Skickar data från servern i data variabeln
      if (err) throw err;
      res.render('todo', {todos: data}); // Skriver ut alla data om finns i data variabeln
    })

  });

  app.post('/todo', urlencodedParser, function(req, res){
    // Får data från view och skickar den till mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    // Radera det markerade alternativet från mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json();
    });
  });

};
