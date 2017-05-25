let Article = require('../models/article-model');
let ObjectId = require('mongoose').Types.ObjectId;
let DateService = require('../technical/current-date-service');

let Discussion = require('../models/discussion-model');
let userService = require('./user-service');

let Q = require('q');

const chalk = require('chalk');
let self = module.exports = {

  findOne: function (id, callback) {
    Discussion.findOne({
      article_id: id
    }, function (err, discussion) {
      if (err) {
        return callback(err);
      }
      return callback(null, discussion);
    })
  },

  save: function (articleId, callback) {
    let discussion = new Discussion({
      article_id: articleId,
      comments: []
    })
    discussion.save(discussion, function (err) {
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  },

  findComment: function (commentId, callback) {
    Discussion.findOne({
      "comments._id": commentId
    }, function (err, doc) {
      if (err) return callback(err);
      return callback(null, doc);
    })
  },

  addComment: function (articleId, comment, callback) {
    if (comment.user_id == undefined) {
      return callback("Invalid UserId");
    } else {
      Discussion.update({
        article_id: articleId
      }, {
        $push: {
          "comments": {
            user_id: comment.user_id,
            date: DateService.getCurrentDay(),
            text: comment.text
          }
        }
      }, function (err) {
        if (err) return callback(err);
        return callback(null);
      })
    }

  },

  editComment: function (articleId, comment, callback) {
    Discussion.findOneAndUpdate({
      "article_id": articleId,
      "comments._id": comment._id
    }, {
      "$set": {
        "comments.$.text": comment.text
      }
    }, function (err, doc) {
      if (err) return callback(err);
      else {
        return callback(null);
      }
    });
  },

  removeComment: function (articleId, commentId, callback) {
    Discussion.findOneAndUpdate({
      "article_id": articleId
    }, {
      "$pull": {
        "comments": {
          _id: commentId
        }
      }
    }, function (err) {
      if (err) return callback(err);
      return callback(null);
    })
  },


  getParticipants: function (articleId, callback) {
    /** Store complete info */
    let participantsList = [];
    /** Just store user id */
    let participantId = [];
    Discussion.findOne({
      "article_id": articleId
    }, function (err, doc) {
      if (err) return callback(err);
      else {
        // query id of user
        let comments = doc.comments;

        let pushInfo = function (comments) {
          let promises = comments.map(comment => {
            if (participantId.indexOf(String(comment.user_id)) < 0) {
              participantId.push(String(comment.user_id));
              return userService.getIdAndUsername(comment.user_id).then(info => {
                participantsList.push(info);
                return Q.resolve(info);
              })
            }
          });
          return Q.all(promises);

        }

        /** Use to remove undefined object in array */
        Array.prototype.clean = function (deleteValue) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
              this.splice(i, 1);
              i--;
            }
          }
          return this;
        };


        pushInfo(comments).then(participantsList => {
          participantsList.clean(undefined);
          callback(null, participantsList)
        });

      }
    });
  },


  /**Init discussion for articles */
  initDiscussion: function (callback) {
    Article.find(function (err, doc) {
      if (err) return callback(err);
      doc.forEach(function (doc) {
        self.hasDiscussion(doc._id).then(function (condition) {
          if (condition == false) {
            self.save(doc._id, function (err) {
              if (err) console.log(err);
            });
          }
        }, function (err) {
          console.log(err);
        });
      })
    })
  },

  hasDiscussion: function (articleId) {
    let defer = Q.defer();
    Discussion.findOne({
      "article_id": articleId
    }, function (err, doc) {
      if (err) defer.reject(err);
      else {
        if (doc == null) {
          defer.resolve(false);
        }
        defer.resolve(true);
      }
    });
    return defer.promise;

  }
}