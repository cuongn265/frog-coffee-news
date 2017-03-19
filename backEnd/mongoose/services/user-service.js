/** User Service: provide methods on User Model */
let User = require('../models/user-model');
let Comment = require('../models/comment-model');
let ObjectId = require('mongoose').Types.ObjectId;

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
        //let user = new User(doc);
        let user = new User({
            "first_name": "Nhan dm",
            "last_name": "Ngo Manh",
            "password": "$2a$06$e6SZPEAl2tHgUPn6hfbEMu.sO5nAvXZ2sjcAXuDrwL6if.dUpIktu",
            "email": "cuongnm265@gmail.com",
            "phone": "+84964303602",
            "facebook": "https://www.facebook.com/eugene.1726",
            "twitter": "",
            "googleplus": "",
            "enable": true,
            "role": "58cd47b2879f9e00c88747c0"
        });

        user.save(function (err) {
            if (err) return callback(err);
            else
                return callback(null);
        });
    },

    /** Update User document */
    update: function (id, document, callback) {
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
    },


    /** get all comments */

    getComments: function (userId, callback) {
        if (ObjectId.isValid(userId)) {

        } else {
            return callback('Invalid ObjectId');
        }
    },

    /** Populate role name */
    getRolename: function (userId, callback) {
        User.findById(userId).populate('role').exec(function (err, doc) {
            if (err) return callback(err);
            console.log(doc.role);
            return callback(null, doc.role[0].name);
        });
    }
}