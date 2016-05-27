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

// Main route. Gets all the data from github webhook
router.post('/pull_request', function(req, res) {
  action = req.body.action;

  switch(action) {
    case 'opened':
      opening_handler(req.body);
      break;
    case 'edited':
      editing_handler(req.body);
      break;
    default:
      console.log('Action not handled');
  }
  res.send('Received!');
});

router.get('/', function(req, res) {
  res.send('Nothing to see here :p');
});

app.use('/', router);

var opening_params = function(body) {
  var params = {
    description: body.pull_request.body,
    url: body.pull_request.html_url
  };
  return params;
};

// Handlers for the different actions on pull requests (opened, edited, closed, synchronize, reopened)
var opening_handler = function(body) {
  params = opening_params(body);
  console.log('You have opened a new PR at url : ' + params['url'] + ' with the description : ' + params['description']);
};

var editing_handler = function(body) {
  console.log('PR edited');
};

app.listen(port, function() {
  console.log('Listening on ' + port);
});
