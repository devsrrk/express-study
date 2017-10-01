var express = require('express');
var router = express.Router();

var user = [];

function User(name, id){
  this.name = "";
  this.id = "";
}

// new User(name, id);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});


module.exports = router;
