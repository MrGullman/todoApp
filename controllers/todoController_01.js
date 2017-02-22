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

var itemOne = Todo({item: 'Buy Flowers'}).save(function(err){
  if (err) throw err;
  console.log('Item saved!');
})


var data = [{item: 'Get milk'}, {item: 'Play ball'}, {item: 'Kick som coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });

};
