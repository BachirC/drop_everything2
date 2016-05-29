var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var router = express.Router();
var WebhookValidator = require('./models/webhook_validator');
var SlackBot = require('./client/slackbot.js');

app.use(bodyParser.json());

router.use(function(req, res, next) {
  // log each request to the console
  console.log('Request : ' +  req.method, req.url);
  next();
});

// Gets all the data from github pull_request webhook
router.post('/pull_request', function(req, res) {
  webhook = req.get('X-GitHub-Event');
  action = req.body.action;
  webhookValidator = new WebhookValidator(webhook, action, req.body);

  if (webhookValidator.validateWebhook()) {
    handler = webhookValidator.instantiateHandler();
    if (handler.validateAction()) {
      info = handler.sendInfo();
      var bot = new SlackBot(info);
      bot.sendMessage();
      res.status(200).send(info);
    }
    else {
      res.status(400).send('Invalid Action "' + action + '"');
    };
  }
  else {
    res.status(400).send('Webhook "' + webhook + '" unknown');
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

app.listen(port, function() {
  console.log('Listening on ' + port);
});
