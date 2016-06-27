if (process.env.NODE_ENV=='development') require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var router = express.Router();
var WebhookValidator = require('./models/webhook_validator');
var SlackBot = require('./client/slackbot.js');

var redis = require("redis"),
    client = redis.createClient(process.env.REDIS_URL);

app.use(bodyParser.json());

router.use((req, res, next) => {
  // log each request to the console
  console.log('Request : ' +  req.method, req.url);
  next();
});

router.use((req, res, next) => {
  client.set(Date.now(), JSON.stringify(req.body));
  next();
});

// Gets all the data from github pull_request webhook
router.post('/pull_request', (req, res) => {
  webhook = req.get('X-GitHub-Event');
  action = req.body.action;
  webhookValidator = new WebhookValidator(webhook, action, req.body);

  if (webhookValidator.validateWebhook()) {
    handler = webhookValidator.instantiateHandler();
    if (handler.validateAction()) {
      info = handler.sendInfo();
      if (info == null) return res.status(200).send();
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

router.get('/', (req, res) => {
  res.send('Nothing to see here :p');
});

app.use('/', router);

app.listen(port, () => {
  console.log('Listening on ' + port);
});
