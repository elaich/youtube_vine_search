var express = require('express'); 
var Youtube = require('youtube-api');
var Vineapple = require('vineapple');
var app = express();

Youtube.authenticate({
  type: "key",
  key: "AIzaSyBgRwbBIjjisuA7zE0uNbhb1OuA7pGPuNM"
})

/*
app.get('/', function(req, res) {
  res.end('Hello World!');
})
*/

app.get('/api/search/youtube', function(req, res) {
  youtubeSearch(
    req.query.q, 
    req.query.token, 
    function(err, result) {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.json(result);
  })
})

app.get('/api/search/vine', function(req, res) {
  vineSearch(
    req.query.q,
    req.query.token,
    function(err, result) {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.json(result);
    })
})

function vineSearch(q, page, callback) {
  var vine = new Vineapple();
  vine.tag(q, {page: page, size: 10}, callback);
}

function youtubeSearch(q, token, callback) {
  Youtube.search.list({
    part: 'id,snippet', 
    q: q, 
    pageToken: token,
    maxResults: 10
  }, callback)
}

// listening
var port = process.env.PORT || 9000;
app.listen(9000);
