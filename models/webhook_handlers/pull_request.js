'use strict';
const OPENED_ACTION = 'opened';
const EDITED_ACTION = 'edited';
const SYNC_ACTION = 'synchronize';
const ALLOWED_ACTIONS = [OPENED_ACTION, EDITED_ACTION, SYNC_ACTION];
const PR_TYPE = 'pull_request';

var Parser = require('../../models/comment_parser.js');

class PullRequest {

  constructor (data, action) {
    this.data = data;
    this.action = action;
  }

  sendInfo () {
    return this.extractInfo();
  }

  validateAction () {
    return (ALLOWED_ACTIONS.indexOf(this.action) !== -1);
  }

  extractInfo () {
    var data = this.data;
    return {
      'action'          : action,
      'type'            : PR_TYPE,
      'repo'            : data['repository']['name'],
      'pr_title'        : data['pull_request']['title'],
      'pr_url'          : data['pull_request']['html_url'],
      'recipients'      : this.getAssignee(data),
      'pr_github_owner' : data['pull_request']['user']['login'],
      'author_url'      : data['pull_request']['user']['avatar_url']
    };
  }

  getAssignee (data) {
    switch(this.action) {
      case EDITED_ACTION:
        diff = Parser.diffArrays(data['pull_request']['body'].split(' '), data['changes']['body']['from'].split(' ')).join(' ');
        return Parser.extractUsernames(diff);
        break;
      default:
        return Parser.gitToSlack(Parser.extractUsernames(data['pull_request']['body']));
    }
  }
}
module.exports = PullRequest;
