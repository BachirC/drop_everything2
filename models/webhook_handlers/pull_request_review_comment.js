'use strict';
const CREATED_ACTION = 'created';
const ALLOWED_ACTIONS = [CREATED_ACTION];
const PR_REVIEW_COM_TYPE = 'pull_request_review_comment';

var Parser = require('../../models/comment_parser.js');

//Extract info from pull_request_review_comment webhook
class PRReviewComment {

  constructor (data, action) {
    this.data = data;
    this.action = action;
  }

  sendInfo () {
    return this.extractInfo(this.data);
  }

  validateAction () {
    return (ALLOWED_ACTIONS.indexOf(this.action) !== -1);
  }

  extractInfo (data) {
    return {
      'action'     : this.action,
      'type'       : PR_REVIEW_COM_TYPE,
      'repo'       : data['repository']['name'],
      'pr_title'   : data['pull_request']['title'],
      'pr_url'     : data['pull_request']['html_url'],
      'pr_owner'   : data['pull_request']['user']['login'],
      'recipients' : Parser.gitToSlack([data['pull_request']['user']['login'].substr(1)]),
      'com_author' : data['comment']['user']['login'],
      'com_url'    : data['comment']['html_url'],
      'com_body'   : data['comment']['body'],
      'diff_hunk'  : data['comment']['diff_hunk']
    };
  }
}


module.exports = PRReviewComment;
