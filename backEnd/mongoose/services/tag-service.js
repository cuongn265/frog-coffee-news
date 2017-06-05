/**
 * Tag Service
 */


let Tag = require('../models/tag-model');
let dateService = require('../technical/current-date-service');
let ObjectId = require('mongoose').Types.ObjectId;
let Q = require('q');
const chalk = require('chalk');

let self = module.exports = {
    /** FInd one */
    findOne: function (tagId, callback) {
        let defer = Q.defer();

        if (ObjectId.isValid(tagId)) {
            Tag.findById(tagId, function (err, doc) {
                if (err) defer.reject(err);
                defer.resolve(doc);
            });
        }
        return defer.promise;
    },

    /**Find all tags */
    findAll: function (callback) {
        Tag.find(function (err, docs) {
            if (err) return callback(err);
            else {
                return callback(null, docs);
            }
        });
    },

    /**Save new tags */
    save: function (document, callback) {
        let tag = new Tag(document);
        tag.save(function (err) {
            if (err) return callback(err);
            else {
                return callback(null);
            }
        });
    },

    /** Update tag */
    update: function (documentId, document, callback) {
        if (ObjectId.isValid(documentId)) {
            Tag.findByIdAndUpdate(documentId, document, function (err) {
                if (err) return callback(err);
                else {
                    return callback(null);
                }
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },

    /** Remove tag */
    remove: function (documentId, callback) {
        if (ObjectId.isValid(documentId)) {
            Tag.findByIdAndRemove(documentId, function (err) {
                if (err) return callback(err);
                else {
                    return callback(null);
                }
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },


    /** List all article info in selected tag */
    listArticles: function (documentId) {
        let defer = Q.defer();
        if (ObjectId.isValid(documentId)) {
            Tag.findById(documentId).populate('articles').exec(function (err, docs) {
                if (err) defer.reject(err);
                defer.resolve(docs);
            });
        }
        return defer.promise;
    },

    listArticlesWithinDay: function (tagId, numberOfDayAgo) {
        let defer = Q.defer();
        let date = dateService.getSpecificDayAgo(numberOfDayAgo);
        Tag.findById(tagId).populate({
            path: 'articles',
            match: {
                'date': {
                    '$gte': new Date(date)
                }
            }
        }).select('articles').exec(function (err, articles) {
            if (err) defer.reject(err);
            defer.resolve(articles);
        });
        return defer.promise;
    },

    pushArticleToTags: function (articleId, tags) {

        let promises = tags.map(tag => {
            return self.pushArticleToTag(articleId, tag).then(() => {
                return Q.resolve();
            }).catch((err) => {
                return Q.reject(err);
            });
        });
        return Q.all(promises);
    },

    pushArticleToTag: function (articleId, tagId) {
        let defer = Q.defer();
        self.tagContainArticle(articleId, tagId).then((isExist) => {
            if (isExist) defer.resolve();
            else {
                Tag.findByIdAndUpdate(tagId, {
                    "$push": {
                        "articles": articleId
                    }
                }, function (err) {
                    if (err) defer.reject(err);
                    defer.resolve();
                });
            }
        });
        return defer.promise;
    },

    pullArticleFromTags: function (articleId, tags) {
        let promises = tags.map(tag => {
            return self.pullArticleFromTag(articleId, tag.tag_id).then(() => {
                return Q.resolve();
            }).catch((err) => {
                return Q.reject(err);
            });
        });
        return Q.all(promises);
    },

    pullArticleFromTag: function (articleId, tagId) {
        let defer = Q.defer();
        self.tagContainArticle(articleId, tagId).then((isExist) => {
            if (isExist) {
                Tag.findByIdAndUpdate(tagId, {
                    "$pull": {
                        "articles": articleId
                    }
                }, function (err, doc) {
                    if (err) defer.reject(err);
                    defer.resolve(doc);
                });
            }
        });
        return defer.promise;
    },

    tagContainArticle: function (articleId, tagId) {
        let defer = Q.defer();
        Tag.find({
            "_id": tagId,
            "articles": {
                "$elemMatch": {
                    "$eq": articleId
                }
            }
        }).select('articles').exec(function (err, doc) {
            if (err) defer.reject(err);
            if (typeof doc[0] !== 'undefined') {
                for (let article of doc[0].articles) {
                    if (article == articleId) {
                        defer.resolve(true);
                    }
                }
                defer.resolve(false);
            }
            defer.resolve(false);
        });
        return defer.promise;
    }
}