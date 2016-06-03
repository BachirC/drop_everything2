'use strict';
const ISSUES = 'issues';
const ISSUE_COMMENT = 'issue_comment';
const PULL_REQUEST = 'pull_request';
const PULL_REQUEST_REVIEW_COMMENT = 'pull_request_review_comment';
const ALLOWED_WEBHOOKS = [ISSUES, ISSUE_COMMENT, PULL_REQUEST, PULL_REQUEST_REVIEW_COMMENT];

class WebhookValidator {
  constructor(webhook, action, data) {
    this.webhook = webhook;
    this.action = action;
    this.data = data;
  };

  validateWebhook () {
    return(ALLOWED_WEBHOOKS.indexOf(this.webhook) !== -1);
  };

  instantiateHandler () {
    var Handler = require('./webhook_handlers/' + this.webhook);
    return new Handler(this.data, this.action);
;
  };
}
module.exports = WebhookValidator;
