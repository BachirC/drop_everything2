var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var router = express.Router();

router.use(function(req, res, next) {
  // log each request to the console
  console.log('Request : ' +  req.method, req.url);
  next();
});

router.post('/pull_request', function(req, res) {
  console.log('Pull request received');
  res.send('Received!');
});

router.get('/', function(req, res) {
  res.send('Nothing to see here :p');
});

app.use('/', router);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
