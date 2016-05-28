const ISSUES = 'issues';
const ISSUE_COMMENT = 'issue_comment';
const PULL_REQUEST = 'pull_request';
const PULL_REQUEST_REVIEW_COMMENT = 'pull_request_review_comment';
const ALLOWED_WEBHOOKS = [ISSUES, ISSUE_COMMENT, PULL_REQUEST, PULL_REQUEST_REVIEW_COMMENT];

var Issues = require('./webhook_handlers/issues');
var IssueComment = require('./webhook_handlers/issue_comment');
var PullRequest = require('./webhook_handlers/pull_request');
var PullRequestReviewComment = require('./webhook_handlers/pull_request_review_comment');
var underscore = require('underscore.string');

var WebhookValidator = function () {};

WebhookValidator.validateWebhook = function (webhook) {
  return (ALLOWED_WEBHOOKS.indexOf(webhook) !== -1);
};

WebhookValidator.instantiateHandler = function (webhook, data) {
  switch(webhook) {
    case ISSUES:
      return new Issues(data);
      break;
    case ISSUE_COMMENT:
      return new IssueComment(data);
      break;
    case PULL_REQUEST:
      return new PullRequest(data);
      break;
    case PULL_REQUEST_REVIEW_COMMENT:
      return new PullRequestReviewComment(data);
      break;
  };
};

module.exports = WebhookValidator;
