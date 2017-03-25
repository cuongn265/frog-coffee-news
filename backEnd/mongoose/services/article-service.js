/** Article  Service*/
let Article = require('../models/article-model');
let ObjectId = require('mongoose').Types.ObjectId;
let DateService = require('../technical/current-date-service');
let categoryService = require('./category-service');
let Q = require('q');
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
    findByCategory: function (category, callback) {
        let deffer = Q.defer();
        let categoryId = category;
        /** if category paramater is not object ID ? - may be it's a name ? **/
        if (!ObjectId.isValid(category)) {
            categoryService.getIdByName(category).then(function (category) {
                    categoryId = category._id;
                }, function (err) {
                    console.log('Rejected !');
                    return deffer.reject(err);
                })
                .then(function (err) {
                    console.log('Still attempt to find');
                    console.log(err);
                    Article.find({
                        category: categoryId
                    }, function (err, docs) {
                        if (err) return callback(err);
                        return callback(null, docs);
                    })
                }, function (err) {
                    console.log(err);
                    return callback(err);
                }).catch(function(err){
                    console.log(err+'from catch');
                });
        } 
        
        
        
        else {
            Article.find({
                category: categoryId
            }, function (err, docs) {
                if (err) return callback(err);
                console.log('your doc');
                console.log(docs);
                if(docs[0] == null) return callback('Invalid Category');
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


    /** Save new Article */
    save: function (document, callback) {
        let article = new Article(document);
        article.date = DateService.getCurrentDay();
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