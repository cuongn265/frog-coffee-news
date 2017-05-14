/**
 * Tag Service
 */


let Tag = require('../models/tag-model');
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
    listArticles: function (documentId, callback) {
        if (ObjectId.isValid(documentId)) {
            Tag.findById(documentId).populate('articles').exec(function (err, docs) {
                if (err) return callback(err);
                return callback(null, docs);
            });
        }
        return callback('Invalid ObjectId');
    }
}