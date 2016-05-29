var _ = require('underscore');
var slack = require('slack');
var botToken = 'xoxb-46619630689-OWDwtjPR3pXlVynZsoHnsjW1';
var SlackBot = function(info) {
  this.info = info;
};

SlackBot.prototype.sendMessage = function () {
  slack.users.list({ 'token' : botToken }, function (err, data) {
    if (err) return console.log(err);
    users = _.reject(data['members'], function (e) { return info['pr_assignee'].indexOf(e['name']) === -1 })
             .map(function (e) { return e['id'] });

    users.forEach(function (userId) {
      slack.im.open({ 'token' : botToken, 'user' : userId }, function (err, data) {
        if (err) return console.log(err);
        //slack.chat.postMessage({ 'token' : botToken, 'channel' : data['channel']['id'], 'text' : 'yo' }, function(err, data) {
       // });
      });
    });
  });
};

module.exports = SlackBot;
