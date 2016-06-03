'use strict';
var _ = require('underscore');
var slack = require('slack');
var botToken = process.env.BOT_TOKEN;
var MessageBuilder = require('../models/message_builder');

class SlackBot {
  constructor(info) {
    this.info = info;
  }

  sendMessage () {
    slack.users.list({ 'token' : botToken }, (err, data) => {
      if (err) return console.log(err);
      var users = _.reject(data['members'], e => (info['recipients'].indexOf(e['name']) === -1))
                .map(e => e['id']);

      users.forEach(userId => {
        slack.im.open({ 'token' : botToken, 'user' : userId }, (err, data) => {
          if (err) return console.log(err);

          var msgBuilder = new MessageBuilder;
          var msg = msgBuilder.build(info);

          slack.chat.postMessage({
            'token' : botToken,
            'username' : 'DEv2',
            'channel' : data['channel']['id'],
            'as_user' : false,
            'icon_emoji' : ':dab:',
            'text' : msg['text'],
            'attachments' : JSON.stringify(msg['attachments'])
          }, (err, data) => {
              if (err) return console.log(err);
            });
        });
      });
    });
  }
}
module.exports = SlackBot;
