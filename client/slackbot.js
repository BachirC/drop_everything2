var _ = require('underscore');
var slack = require('slack');
var botToken = 'xoxb-46619630689-OWDwtjPR3pXlVynZsoHnsjW1';
var SlackBot = function(info) {
  this.info = info;
};

SlackBot.prototype.sendMessage = function () {
  slack.users.list({ 'token' : botToken }, function (err, data) {
    if (err) return console.log(err);
    users = _.reject(data['members'], function (e) { return info['recipients'].indexOf(e['name']) === -1 })
             .map(function (e) { return e['id'] });

    users.forEach(function (userId) {
      slack.im.open({ 'token' : botToken, 'user' : userId }, function (err, data) {
        if (err) return console.log(err);

        msg = MessageBuilder.build(info);
        slack.chat.postMessage({
          'token' : botToken,
          'username' : 'DEv2',
          'channel' : data['channel']['id'],
          'as_user' : false,
          'icon_emoji' : ':dab:',
          'text' : msg['text'],
          'attachments' : JSON.stringify(msg['attachments'])
        }, function(err, data) {
          if (err) return console.log(err);
        });
      });
    });
  });
};

module.exports = SlackBot;
