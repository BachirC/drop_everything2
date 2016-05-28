var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var router = express.Router();
var EventHandler = require('./models/event_handler');
var eventHandler = new EventHandler();

app.use(bodyParser.json());

router.use(function(req, res, next) {
  // log each request to the console
  console.log('Request : ' +  req.method, req.url);
  next();
});

// Gets all the data from github pull_request webhook
router.post('/pull_request', function(req, res) {
  console.log('header : ' + req.get('X-GitHub-Event'));
  action = req.body.action;
  if (EventHandler.validateActionType(action)) {
    eventHandler[action]();
    res.send('Received!');
  }
  else {
    res.send('Unknown action : ' + action);
  };
});

router.get('/', function(req, res) {
  res.send('Nothing to see here :p');
});

app.use('/', router);

var openingParams = function(body) {
  var params = {
    description: body.pull_request.body,
    url: body.pull_request.html_url,
    repo: body.repository.name
  };
  return params;
};

// Handlers for the different actions on pull requests (opened, edited, closed, synchronize, reopened)
app.listen(port, function() {
  console.log('Listening on ' + port);
});
