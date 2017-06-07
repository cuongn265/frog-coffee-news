/** User Service: provide methods on User Model */
let User = require('../models/user-model');
let ObjectId = require('mongoose').Types.ObjectId;
let Q = require('q');
let gravatar = require('gravatar');
let config = require('config');

const chalk = require('chalk');

let tagService = require('./tag-service');

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
    findOnePromise: function (userId) {
        let defer = Q.defer();
        User.findById(userId, function (err, doc) {
            if (err) return defer.reject(err);
            return defer.resolve(doc);
        });
        return defer.promise;
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
            self.findOnePromise(userId).then(function (doc) {
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
        let defer = Q.defer();
        let newStatus = !currentStatus;
        User.findByIdAndUpdate(userId, {
            enable: newStatus
        }, function (err) {
            if (err) return defer.reject(err);
            return defer.resolve(null);
        });
        return defer.promise;
    },


    /** Populate role name */
    getRolename: function (userId, callback) {
        User.findById(userId).populate('role').exec(function (err, doc) {
            if (err) return callback(err);
            return callback(null, doc.role.name);
        });
    },

    getProfileImageUrl: function (userId) {
        let defer = Q.defer();
        self.findOnePromise(userId).then((user) => {
            let email = user.email;
            let first_name = user.user_metadata.first_name;
            let last_name = user.user_metadata.last_name;
            let defaultImage = self.generateAuth0ProfileImage(first_name, last_name);
            let profileImageUrl = gravatar.url(email, {
                d: defaultImage,
                protocol: 'https'
            });
            defer.resolve(profileImageUrl);
        });
        return defer.promise;
    },

    generateAuth0ProfileImage: function (first_name, last_name) {
        let name = first_name.slice(0, 1) + last_name.slice(0, 1);
        name = name.toLowerCase();
        let url = config.get('auth0ProfileImage.path') + name + config.get('auth0ProfileImage.extension-type');
        return url;
    },

    queryTrackingCategory: function (userId, categoryName) {
        // find - if not push new
        let defer = Q.defer();
        let option = {
            upsert: true,
            new: true
        };

        User.findOne({
            "_id": userId,
            "categories_track.category": categoryName
        }, function (err, doc) {
            if (err) {
                console.log(err)
            };
            if (doc == null) {
                User.findByIdAndUpdate(userId, {
                    $push: {
                        "categories_track": {
                            "category": categoryName
                        }
                    }
                }, option, function (err) {
                    if (err) defer.reject(err);
                    defer.resolve(true);
                });
            } else {
                defer.resolve(true);
            }
        });
        return defer.promise;
    },

    queryTrackingTag: function (userId, tag) {
        let defer = Q.defer();
        let option = {
            upsert: true,
            new: true
        };
        User.findOne({
            "_id": userId,
            "tags_track.tag_id": tag.tag_id
        }, function (err, doc) {
            if (err) console.log(err);
            if (doc == null) {
                User.findByIdAndUpdate(userId, {
                    $push: {
                        "tags_track": {
                            "tag_id": tag.tag_id,
                            "name": tag.name
                        }
                    }
                }, option, function (err, doc) {
                    if (err) defer.reject(err);
                    defer.resolve(true);
                });
            } else {
                defer.resolve(true);
            }
        });
        return defer.promise;
    },


    /** User tracking stuff */
    updateCategoryVisitCount: function (userId, categoryName) {
        let option = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };
        self.queryTrackingCategory(userId, categoryName).then(function () {
            User.findOneAndUpdate({
                "_id": userId,
                "categories_track.category": categoryName
            }, {
                $inc: {
                    "categories_track.$.visit_time": 1
                }
            }, option, function (err) {
                if (err) console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    },

    updateTagsVisitCount: function (userId, tags) {
        let promises = tags.map((tag) => {
            return self.updateTagVisitCount(userId, tag).then(() => {
                Q.resolve(null);
            }).catch((err) => {
                console.error(err);
            });
        });
        return Q.all(promises);
    },

    updateTagVisitCount: function (userId, tag) {
        let defer = Q.defer();
        let option = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
        self.queryTrackingTag(userId, tag).then(() => {
            User.update({
                "_id": userId,
                "tags_track.tag_id": tag.tag_id
            }, {
                "$inc": {
                    "tags_track.$.visit_time": 1
                }
            }, option, function (err, doc) {
                if (err) defer.reject(err);
                defer.resolve(null);
            });
        }).catch((err) => {
            console.log(err);
        });
        return defer.promise;
    },

    findFavoriteTags: function (userId) {
        let defer = Q.defer();
        User.aggregate({
            '$match': {
                '_id': ObjectId(userId)
            }
        }, {
            '$unwind': "$tags_track"
        }, {
            '$sort': {
                'tags_track.visit_time': -1
            }
        }, {
            '$limit': 10
        }, {
            '$project': {
                'tag_id': '$tags_track.tag_id',
                'name': '$tags_track.name',
                'visit_time': '$tags_track.visit_time'
            }
        }).exec(function (err, tags) {
            if (err) defer.reject(err);
            defer.resolve(tags);
        });

        return defer.promise;
    },

    /** Notification Method stuffs */
    pushNotification: function (notification) {
        let defer = Q.defer();
        let option = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }


        User.findByIdAndUpdate(notification.recipient, {
            "$push": {
                "notifications": {
                    "sender": notification.sender,
                    "message": notification.message,
                    "seen": notification.seen,
                    "read": notification.read
                }
            }
        }, option, function (err) {
            if (err) defer.reject(err);
            defer.resolve(null);
        })
        return defer.promise;
    },


    /** Miscellanious  */
    getIdAndUsernameWithProfileImage: function (userId) {
        let defer = Q.defer();
        let info = {
            user_id: undefined,
            username: undefined,
            profileImage: undefined
        }
        User.findById(userId, function (err, doc) {
            if (err) {
                defer.reject(err);
            } else {
                info.user_id = doc._id;
                info.username = (doc.user_metadata.first_name + doc.user_metadata.last_name).replace(" ", "");
                self.getProfileImageUrl(info.user_id).then((imageURL) => {
                    info.profileImage = imageURL;
                    defer.resolve(info);
                }).catch((err)=>{
                    defer.reject(err);
                })
            }
        });
        return defer.promise;
    }



}