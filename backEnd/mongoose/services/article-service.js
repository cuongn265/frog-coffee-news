/** Article  Service*/
let Article = require('../models/article-model');
let ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
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
    findByCategory: function (categoryId, callback) {
        if (ObjectId.isValid(categoryId)) {
            Article.find({
                category: categoryId
            }, function (err, docs) {
                if (err) throw err;
                else return callback(null, docs);
            });
        } else {
            return callback('Invalid ObjectId');
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


    /** Save new Article */
    save: function (document, callback) {
        let article = new Article(document);
        article.save(function (err) {
            if (err) return callback(err);
            else {
                return callback(null);
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