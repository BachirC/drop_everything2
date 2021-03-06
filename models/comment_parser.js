'use strict';
var _ = require('underscore');
var users_mapping = require('../users_mapping.json');
var groups_mapping = require('../groups_mapping.json')

class CommentParser {

  static extractUsernames (comment) {
    var res = [];
    if (typeof comment === undefined)
      return res;

    comment.split(" ").forEach(ele => {
      if (ele[0] !== '@')
        return;

      res.push(ele.substr(1));
    });
    return res;
  };

  static diffArrays (a1, a2) {
    return _.difference(a1, a2);
  };

  static gitToSlack (git_usernames) {
    var res = [];

    git_usernames.forEach(ele => {
      if (ele in users_mapping) {
        res.push(users_mapping[ele]);
      } else if (ele in groups_mapping) {
        res = res.concat(groups_mapping[ele])
      }
    });

    return _.uniq(res);
  };
}

module.exports = CommentParser;
