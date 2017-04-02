let Article = require('../models/article-model');
let ObjectId = require('mongoose').Types.ObjectId;
let DateService = require('../technical/current-date-service');

let Discussion = require('../models/discussion-model');
let self = module.exports = {

  findOne: function(id, callback) {
    Discussion.findOne({article_id: id}, function(err, discussion) {
      if (err) {
        return callback(err);
      }
      return callback(null, discussion);
    })
  },

  save: function(articleId, callback) {
    let discussion = new Discussion({
      article_id: articleId,
      comments: []
    })
    discussion.save(discussion, function(err) {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  },

  addComment: function(comment, callback) {
    Discussion.update({article_id: comment.article_id}, {
      $push: {
        "comments": {
          user: comment.user,
          date: DateService.getCurrentDay(),
          text: comment.text }
      }
    }, function(err) {
      if (err) return callback(err);
      return callback(null);
    })
  }
}
