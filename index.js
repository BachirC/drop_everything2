var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var router = express.Router();

app.use( bodyParser.json() );

router.use(function(req, res, next) {
  // log each request to the console
  console.log('Request : ' +  req.method, req.url);
  next();
});

router.post('/pull_request', function(req, res) {
  params = extract_params(req.body);
  console.log('Message : ' + params['description'] + ' At url : ' + params['url']);
  res.send('Received!');
});

router.get('/', function(req, res) {
  res.send('Nothing to see here :p');
});

app.use('/', router);

var extract_params = function(body) {
  var params = {
    description: body.pull_request.body,
    url: body.pull_request.html_url
  };
  return params;
};


app.listen(port, function() {
  console.log('Listening on ' + port);
});
