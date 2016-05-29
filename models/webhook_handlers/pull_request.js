const OPENED_ACTION = 'opened';
const EDITED_ACTION = 'edited';
const SYNC_ACTION = 'synchronize';
const ALLOWED_ACTIONS = [OPENED_ACTION, EDITED_ACTION, SYNC_ACTION];
const PULL_REQUEST_TYPE = 'pr'

var Parser = require('../../models/comment_parser.js');

var PullRequest = function (data, action) {
  this.data = data;
  this.action = action;
};


PullRequest.prototype.sendInfo = function () {
  return extractInfo(this.data);
};

PullRequest.prototype.validateAction = function () {
  return (ALLOWED_ACTIONS.indexOf(this.action) !== -1);
};

var extractInfo = function (data) {
  return {
    'action' : this.action,
    'type' : PULL_REQUEST_TYPE,
    'repo' : data['repository']['name'],
    'pr_title' : data['pull_request']['title'],
    'pr_url' : data['pull_request']['html_url'],
    'pr_assignee' : getAssignee(data),
    'pr_owner' : data['pull_request']['user']['login']
  };
};

var getAssignee = function (data) {
  switch(this.action) {
    case EDITED_ACTION:
      diff = Parser.diffArrays(data['pull_request']['body'].split(' '), data['changes']['body']['from'].split(' ')).join(' ');
      return Parser.extractUsernames(diff);
      break;
    default:
      return Parser.extractUsernames(data['pull_request']['body']);
  };
};
module.exports = PullRequest;
