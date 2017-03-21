/** User Service: provide methods on User Model */
let User = require('../models/user-model');
let Comment = require('../models/comment-model');
let ObjectId = require('mongoose').Types.ObjectId;
let Q = require('q');

let self = module.exports = {

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


    /** Find one with promise */
    findOne_promise: function (userId) {
        let deffer = Q.defer();
        User.findById(userId, function (err, doc) {
            if (err) return deffer.reject(err);
            return deffer.resolve(doc);
        });
        return deffer.promise;
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

    /** toggle user lock status  */

    toggleEnable: function (userId, callback) {
        /**
         * Async shit go here: get query to retrieve 'enabled' status of user first,
         * second query to update it to !
         */
        if (ObjectId.isValid(userId)) {
            self.findOne_promise(userId).then(function (doc) {
                let currentStatus = doc.enable;
                self.setAccountStatus(userId, currentStatus).then(function () {
                    return callback(null);
                }, function (err) {
                    return callback(err);
                });
            }, function (err) {
                return callback(err);
            });

        } else {
            return callback('Invalid ObjectId');
        }
    },

    /** Set lock/unlock */
    setAccountStatus: function (userId, currentStatus) {
        let deffer = Q.defer();
        let newStatus = !currentStatus;
        User.findByIdAndUpdate(userId, {
            enable: newStatus
        }, function (err) {
            if (err) return deffer.reject(err);
            return deffer.resolve(null);
        });
        return deffer.promise;
    },


    /** Populate role name */
    getRolename: function (userId, callback) {
        User.findById(userId).populate('role').exec(function (err, doc) {
            if (err) return callback(err);
            return callback(null, doc.role.name);
        });
    }
}