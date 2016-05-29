const ISSUES = 'issues';
const ISSUE_COMMENT = 'issue_comment';
const PULL_REQUEST = 'pull_request';
const PULL_REQUEST_REVIEW_COMMENT = 'pull_request_review_comment';
const ALLOWED_WEBHOOKS = [ISSUES, ISSUE_COMMENT, PULL_REQUEST, PULL_REQUEST_REVIEW_COMMENT];

var underscore = require('underscore.string');

var WebhookValidator = function (webhook, action, data) {
  this.webhook = webhook;
  this.action = action;
  this.data = data;
};

WebhookValidator.prototype.validateWebhook = function () {
  return(ALLOWED_WEBHOOKS.indexOf(this.webhook) !== -1);
};

WebhookValidator.prototype.instantiateHandler = function () {
  return new require('./webhook_handlers/' + this.webhook);
};

WebhookValidator.prototype.validateAction = function (handler) {
  return (handler.ALLOWED_ACTIONS.indexOf(this.action) !== -1);
};

module.exports = WebhookValidator;
