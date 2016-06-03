'use strict';
const OPENED_ACTION = 'opened';
const EDITED_ACTION = 'edited';
const SYNC_ACTION = 'synchronize';
const CREATED_ACTION = 'created';
const PR_TYPE = 'pull_request';
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

class MessageBuilder {

  build (info) {
    switch (info['type']) {
      case PR_TYPE:
        return this.prMessage(info['action']);
        break;
      case PR_REVIEW_COM_TYPE:
        return this.prDiffComMessage(info['action']);
        break;
    };
  }

  prDiffComMessage (action) {
    return {
      'text' : 'New Review Comment on your PR !',
      'attachments' : [
        {
          'text' : '```' + info['diff_hunk'] + '```\n' +  '*@' + info['com_author'] + '* :  _' + info['com_body'] + '_',
          'color' : COLORS[action],
          'mrkdwn_in' : ['text'],
          'footer' : info['repo'],
          'title' : 'View on Github',
          'title_link' : info['com_url'],
          'footer_icon' : LOGO_URL
        }
      ]
    }
  }

  prMessage (action) {
    return {
      'text' : this.prTextMessage(action),
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
  }

  prTextMessage (action) {
    if (action === SYNC_ACTION)
      return 'New Commit !';
    return 'Check out this PR !';
  };
}

module.exports = MessageBuilder;
