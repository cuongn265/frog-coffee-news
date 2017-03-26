/** Category Service: provide methods on Category Model */
var Category = require('../models/category-model');
var ObjectId = require('mongoose').Types.ObjectId;
let Q = require('q');
module.exports = {

    /**Find one document  */
    findOne: function (documentId, callback) {
        if (ObjectId.isValid(documentId)) {
            Category.findById(documentId, function (err, doc) {
                if (err) return callback(err);
                return callback(null, doc);
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },

    /** Find all document */
    findAll: function (callback) {
        Category.find(function (err, docs) {
            if (err) return callback(err);
            return callback(null, docs);
        });
    },

    /** save new Category document */
    save: function (doc, callback) {
        let category = new Category(doc);
        category.save(function (err) {
            if (err) return callback(err);
            else {
                return callback(null);
            }
        });
    },

    /** update category document */
    update: function (documentId, document, callback) {
        if (ObjectId.isValid(documentId)) {
            Category.findByIdAndUpdate(documentId, document, function (err) {
                if (err) return callback(err);
                else
                    return callback(null);
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },

    /** remove category document */
    remove: function (documentId, callback) {
        if (ObjectId.isValid(documentId)) {
            Category.findByIdAndRemove(documentId, function (err) {
                if (err) return callback(err);
                else
                    return callback(null);
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },


    /** get category by category name */
    getIdByName: function (name) {
        let deffer = Q.defer();
        let categoryName = name;
        Category.findOne({
            name: new RegExp('^' + name + '$', "i")
        }, function (err, doc) {
            if (err) return deffer.reject(err);
            if (doc == null) return deffer.reject('Invalid Category');
            return deffer.resolve(doc);
        });
        return deffer.promise;

    }
}