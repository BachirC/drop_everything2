const OPENED_ACTION = 'opened';
const EDITED_ACTION = 'edited';
const SYNC_ACTION = 'synchronize';
const PR_TYPE = 'pr';
const ISSUE_TYPE = 'issue';
const TYPES = [PR_TYPE, ISSUE_TYPE];
const LOGO_URL = 'https://s3-eu-west-1.amazonaws.com/fa-assets/fa-logo-red.png';
const COLORS = { OPENED_ACTION : '#2A363B', EDITED_ACTION : '#2A363B', SYNC_ACTION : '#99B898' }; 

var MessageBuilder = function () {};

MessageBuilder.build = function (info) {
  if (info['type'] === PR_TYPE)
    return prMessage(info['action']);
};

var prMessage = function (action) {
  return {
    'text' : prTextMessage(action), 
      'attachments' : [
      {
        'color' : COLORS[action],
        'author_name' : info['pr_owner'],
        'footer' : info['repo'],
        'title' : info['pr_title'],
        'title_link' : info['pr_url'], 
        'footer_icon' : LOGO_URL
      }
    ]
  };
};

var prTextMessage = function (action) {
  if (action == SYNC_ACTION)
    return 'New Commit !';
  return 'Check out this PR !';
};

module.exports = MessageBuilder;
