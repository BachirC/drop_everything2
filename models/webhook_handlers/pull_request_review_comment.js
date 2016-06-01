const CREATED_ACTION = 'created';
const ALLOWED_ACTIONS = [CREATED_ACTION];
const PR_REVIEW_COM_TYPE = 'pull_request_review_comment';

var Parser = require('../../models/comment_parser.js');

var PRReviewComment = function(data, action) {
  this.data = data;
  this.action = action;
};

PRReviewComment.prototype.sendInfo = function () {
  return extractInfo(this.data);
};

PRReviewComment.prototype.validateAction = function () {
  return (ALLOWED_ACTIONS.indexOf(this.action) !== -1);
};

var extractInfo = function (data) {
  diff_hunk = data['comment']['diff_hunk']
  return {
    'action' : this.action,
      'type' : PR_REVIEW_COM_TYPE,
      'repo' : data['repository']['name'],
      'pr_title' : data['pull_request']['title'],
      'pr_url' : data['pull_request']['html_url'],
      'pr_owner' : data['pull_request']['user']['login'],
      'recipients' : Parser.gitToSlack([data['pull_request']['user']['login'].substr(1)]),
      'com_author' : data['comment']['user']['login'],
      'com_url' : data['comment']['html_url'],
      'com_body' : data['comment']['body'],
      'diff_hunk' : diff_hunk
  };
};


module.exports = PRReviewComment;
