var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var router = express.Router();
var WebhookValidator = require('./models/webhook_validator');

app.use(bodyParser.json());

router.use(function(req, res, next) {
  // log each request to the console
  console.log('Request : ' +  req.method, req.url);
  next();
});

// Gets all the data from github pull_request webhook
router.post('/pull_request', function(req, res) {
  webhook = req.get('X-GitHub-Event');
  if (WebhookHandler = WebhookValidator.validateWebhook(webhook)) {
    action = req.body.action;
    WebhookValidator.instantiateHandler(webhook, req.body);
    res.status(200).end();
  }
  else {
    res.status(400).send('Webhook "' + webhook + '" unknown');
  }
  action = req.body.action;
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

app.listen(port, function() {
  console.log('Listening on ' + port);
});
