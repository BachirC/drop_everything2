const OPENED_ACTION = 'opened';
const EDITED_ACTION = 'edited';
const SYNC_ACTION = 'synchronize';
const CREATED_ACTION = 'created';
const PR_TYPE = 'pr';
const PR_REVIEW_COM_TYPE = 'pull_request_review_comment';
const ISSUE_TYPE = 'issue';
const TYPES = [PR_TYPE, PR_REVIEW_COM_TYPE, ISSUE_TYPE];
const LOGO_URL = 'https://s3-eu-west-1.amazonaws.com/fa-assets/fa-logo-red.png';
const COLORS = {
  OPENED_ACTION : '#2A363B',
  EDITED_ACTION : '#2A363B',
  SYNC_ACTION : '#99B898',
  CREATED_ACTION : '#E84A5F'
};

var MessageBuilder = function () {};

MessageBuilder.build = function (info) {
  switch (info['type']) {
    case PR_TYPE:
      return prMessage(info['action']);
      break;
    case PR_REVIEW_COM_TYPE:
      return prDiffComMessage(info['action']);
      break;
  };
};

var prDiffComMessage = function (action) {
  return {
    'text' : 'New diff comment on your PR !',
    'attachments' : [
      {
        'text' : 'Comment : ' + info['com_body'],
        'color' : COLORS[action],
        'author_name' : info['com_author'],
        'footer' : info['repo'],
        'title' : 'Go to diff comment',
        'title_link' : info['com_url'],
        'footer_icon' : LOGO_URL
      }
    ]
  }
};

var prMessage = function (action) {
  return {
    'text' : prTextMessage(action),
    'attachments' : [
      {
        'color' : COLORS[action],
        'author_name' : info['pr_github_owner'],
        'footer' : info['repo'],
        'title' : info['pr_title'],
        'title_link' : info['pr_url'],
        'footer_icon' : LOGO_URL
      }
    ]
  };
};

var prTextMessage = function (action) {
  if (action === SYNC_ACTION)
    return 'New Commit !';
  return 'Check out this PR !';
};

module.exports = MessageBuilder;
