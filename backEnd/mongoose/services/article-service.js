/** Article  Service*/
let Article = require('../models/article-model');
let ObjectId = require('mongoose').Types.ObjectId;
let DateService = require('../technical/current-date-service');
let categoryService = require('./category-service');
let DiscussionService = require('./discussion-service')
let Q = require('q');
let self = module.exports = {
    /**Find one document */
    findOne: function (documentId, callback) {
        if (ObjectId.isValid(documentId)) {
            Article.findById(documentId, function (err, doc) {
                if (err) return callback(err);
                return callback(null, doc);
            });
        }
    },

    /** Find documents with keyword in content */
    findByContent: function (keywords, callback) {
        console.log('Keyword to find: ' + keywords);
        Article.find({
            title: {
                $regex: keywords,
                $options: 'i'
            }
        }, function (err, docs) {
            if (err) throw err;
            else {
                return callback(null, docs);
            }
        });
    },

    /** Find all document */
    findAll: function (callback) {
        Article.find(function (err, docs) {
            if (err) return callback(err);
            return callback(null, docs);
        });

    },

    /** Find by category */
    findByCategory: function (category, callback) {
        let deffer = Q.defer();
        let categoryId = category;
        /** if category paramater is not object ID ? - may be it's a name ? **/
        if (!ObjectId.isValid(category)) {
            categoryService.getIdByName(category).then(function (category) {
                    categoryId = category._id;
                }, function (err) {
                    return deffer.reject(err);
                })
                .then(function (err) {
                    Article.find({
                        category: categoryId
                    }, function (err, docs) {
                        if (err) return callback(err);
                        return callback(null, docs);
                    })
                }, function (err) {
                    return callback(err);
                }).catch(function (err) {});
        } else {
            Article.find({
                category: categoryId
            }, function (err, docs) {
                if (err) return callback(err);
                if (docs[0] == null) return callback('Invalid Category');
                return callback(null, docs);
            })
        }
    },

    /** Find by creator */
    findByCreator: function (userId, callback) {
        if (ObjectId.isValid(userId)) {
            Article.find({
                created_by: userId
            }, function (err, docs) {
                if (err) throw err;
                else return callback(null, docs);
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },

    findOnePromise: function (articleId) {
        let defer = Q.defer();
        Article.findById(articleId, function (err, doc) {
            if (err) defer.reject(err);
            defer.resolve(doc);
        });
        return defer.promise;
    },

    //
    initDiscussion: function (articleId) {
        let defer = Q.defer();
        DiscussionService.save(articleId, function (err) {
            if (err) {
                return defer.reject();
            }
            return defer.resolve();
        });
        return defer.promise;
    },


    /** Save new Article */
    save: function (document, callback) {
        let article = new Article(document);
        article.date = DateService.getCurrentDay();
        // let that = self;
        article.save(function (err, article) {
            if (err) return callback(err);
            else {
                // return callback(null);
                self.initDiscussion(article._id).then(function () {
                    return callback(null)
                }, function (err) {
                    return callback(err);
                });
            }
        });
    },

    /**Update article */
    update: function (documentId, document, callback) {
        if (ObjectId.isValid(documentId)) {
            Article.findByIdAndUpdate(documentId, document, function (err) {
                if (err) return callback(err);
                else {
                    return callback(null);
                }
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },

    /** Remove article */
    remove: function (documentId, callback) {
        if (ObjectId.isValid(documentId)) {
            Article.findByIdAndRemove(documentId, function (err) {
                if (err) return callback(err);
                else {
                    return callback(null);
                }
            })
        } else {
            return callback('Invalid ObjectId');
        }
    }
}