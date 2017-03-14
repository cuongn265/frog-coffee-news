/** User Service: provide methods on User Model */
var User = require('../models/user-model');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

    /**Find one user */
    findOne: function (userId, callback) {
        if (ObjectId.isValid(userId)) {
            User.findById(userId, function (err, doc) {
                if (err) return callback(err);
                else callback(null, doc);
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },

    /** Find all users */
    findAll: function (callback) {
        User.find(function (err, docs) {
            if (err) return callback(err);
            return callback(null, docs);
        });
    },

    /** Save new User document */
    save: function (doc, callback) {
        let user = new User(doc);
        user.save(function (err) {
            if (err) return callback(err);
            else
                return callback(null);
        });
    },

    /** Update User document */
    update: function (id,document, callback) {
        let documentId = id;
        console.log(documentId);
        if (ObjectId.isValid(documentId)) {
            User.findByIdAndUpdate(documentId, document, function (err) {
                if (err) return callback(err);
                else return callback(null);
            });
        } else {
            return callback('Invalid ObjectId');
        }
    },

    /** remove user document */
    remove: function (document, callback) {
        let documentId = document._id;
        if (Object.isValid(documentId)) {
            User.findByIdAndRemove(documentId, function (err) {
                if (err) return callback(err);
                return callback(null);
            });
        } else {
            return callback('Invalid ObjectId');
        }
    }

    
}