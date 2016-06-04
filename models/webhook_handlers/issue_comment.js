'use strict';

const CREATED_ACTION = 'created';
const ALLOWED_ACTIONS = [CREATED_ACTION];
const ISSUE_COM_TYPE = 'issue_comment';

var Parser = require('../../models/comment_parser.js');

class IssueComment {

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
      'type'               : ISSUE_COM_TYPE,
      'repo'               : data['repository']['name'],
      'issue_title'        : data['issue']['title'],
      'com_body'           : data['comment']['body'],
      'com_url'            : data['comment']['html_url'],
      'com_author'         : data['comment']['user']['login'],
      'recipients'         : Parser.gitToSlack(Parser.extractUsernames(data['comment']['body'])),
      'issue_github_owner' : data['issue']['user']['login']
    };
  }
}

module.exports = IssueComment; 
