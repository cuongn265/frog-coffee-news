/** Article  Service*/
let Article = require('../models/article-model');
let ObjectId = require('mongoose').Types.ObjectId;
let DateService = require('../technical/current-date-service');
let categoryService = require('./category-service');
let DiscussionService = require('./discussion-service')
let Q = require('q');

const chalk = require('chalk');
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
    },



    /**
     * Increase number of view
     */
    increaseView: function (documentId) {
        let defer = Q.defer();
        Article.findByIdAndUpdate(documentId, {
            "$inc": {
                "visit_count": 1
            }
        }, function (err, doc) {
            if (err) defer.reject(err);
            defer.resolve(doc);
        });
        return defer.promise;
    },

    /**
     * Update score base on release date and view
     */
    updateScore: function (documentId) {
        let defer = Q.defer();
        self.findOnePromise(documentId).then((article) => {
            let distance_min = DateService.getMinutesSinceRelease(article.date);
            let score = article.visit_count / distance_min;
            Article.findByIdAndUpdate(documentId, {
                "$set": {
                    "score": score
                }
            }, function (err, doc) {
                if (err) defer.reject(err);
                defer.resolve(doc);
            })
        });
        return defer.promise;
    },


    findTrendingArticlesByCategory: function (categoryId) {
        let defer = Q.defer();
        Article.find({
                category: categoryId
            }).limit(10)
            .sort({
                score: -1
            }).exec(function (err, docs) {
                err ? defer.reject(err) : defer.resolve(docs);
            });
        return defer.promise;
    },

    findAllTrendingArticles: function () {
        let defer = Q.defer();
        Article.find({}).limit(20).sort({
            score: -1
        }).exec(function (err, docs) {
            err ? defer.reject(err) : defer.resolve(docs);
        });
        return defer.promise;
    },

    findLatestArticlesByCategory: function (categoryId) {
        let defer = Q.defer();
        Article.find({
            category: categoryId
        }).limit(10).sort({
            date: -1
        }).exec(function (err, docs) {
            err ? defer.reject(err) : defer.resolve(docs);
        });
        return defer.promise;
    },

    findAllLatestArticles: function () {
        let defer = Q.defer();
        Article.find({}).limit(20).sort({
            date: -1
        }).exec(function (err, docs) {
            err ? defer.reject(err) : defer.resolve(docs);
        });
        return defer.promise;
    },

    initScore: function (callback) {
        Article.update({}, {
            "$set": {
                "visit_count": 0,
                "score": 0
            }
        }, {
            "new": true,
            "multi": true
        }, function (err, docs) {
            if (err) return callback(err);
            return callback(null);
        });
    },

    getCategoryNameByArticleId: function (articleId) {
        let defer = Q.defer();
        self.findOnePromise(articleId).then((article) => {
            return article.category;
        }).then((category) => {
            categoryService.findOne(category, function (err, doc) {
                err ? defer.reject(err) : defer.resolve(doc.name.toLowerCase());
            });
        });
        return defer.promise;
    }
}