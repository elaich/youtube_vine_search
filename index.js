var express = require('express'); 
var app = express();

app.get('/', function(req, res) {
  res.end('Hello World!');
})

// listening
var port = process.env.PORT || 9000;
app.listen(9000);
