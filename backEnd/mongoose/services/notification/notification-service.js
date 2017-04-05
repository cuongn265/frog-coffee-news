let NotifcationType = require('../../models/notification-type-model');
let User = require('../../models/user-model');
let NotificationGenerator = require('./notification-generator-service');
let Q = require('q');


let self = module.exports = {

    /** Notifications request **/

    findOne: function () {

    },

    findAll: function () {

    },

    findbyUser: function (userId, callback) {

    },

    /**------------------------- */
    pushNotification: function (userId, notification) {
        let defer = Q.defer();
        let newNotification = notification;
        newNotification.recipient = userId;
        NotificationGenerator.generateMessageOnType(newNotification).then(notification => {
            defer.resolve(notification);
        })
        return defer.promise;
    },


    /** Methods for manipulating notification type */
    findOneType: function () {
        NotifcationType.find(function (err, docs) {
            if (err) return callback(err);
            return callback(null, docs);
        });
    },

    findAllType: function () {

    },

    saveType: function (doc, callback) {
        let type = new NotifcationType(doc);
        type.save(function (err) {
            if (err) return callback(err);
            return callback(null);
        });
    },

    updateType: function () {

    },

    removeType: function () {

    }
    /** --------------------------------------------- */
}