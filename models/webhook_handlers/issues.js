'use strict';
const OPENED_ACTION = 'opened';
const EDITED_ACTION = 'edited';
const ALLOWED_ACTIONS = [OPENED_ACTION, EDITED_ACTION];
const ISSUES_TYPE = 'issues';

var Parser = require('../../models/comment_parser.js');

class Issues {

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
      'action'             : action,
      'type'               : ISSUES_TYPE,
      'repo'               : data['repository']['name'],
      'issue_title'        : data['issue']['title'],
      'issue_url'          : data['issue']['html_url'],
      'recipients'         : this.getAssignee(data),
      'issue_github_owner' : data['issue']['user']['login'],
      'author_avatar'      : data['issue']['user']['avatar_url']
    };
  }

  getAssignee (data) {
    switch(this.action) {
      case EDITED_ACTION:
        let diff = Parser.diffArrays(data['issue']['body'].split(' '), data['changes']['body']['from'].split(' ')).join(' ');
        return Parser.gitToSlack(Parser.extractUsernames(diff));
        break;
      default:
        return Parser.gitToSlack(Parser.extractUsernames(data['issue']['body']));
    }
  }
}

module.exports = Issues; 
