var _ = require('underscore');
var users_mapping = require('../users_mapping.json');

var CommentParser = function() {};

CommentParser.extractUsernames = function (comment) {
  res = [];
  if (typeof comment === undefined)
    return res;

  comment.split(" ").forEach(function (ele) {
    if (ele[0] !== '@')
      return;

    res.push(ele.substr(1));
  });
  return git_to_slack(res);
};

CommentParser.diffArrays = function (a1, a2) {
  return _.difference(a1, a2);
};

var git_to_slack = function(git_usernames) {
  res = [];
  git_usernames.forEach(function (ele) {
    if (!(ele in users_mapping)) 
      return;
    res.push(users_mapping[ele]);
  });

  return res;
};

module.exports = CommentParser;
