let NotificationType = require('../../models/notification-type-model');
let ArticleService = require('../article-service');
let UserService = require('../user-service');

const chalk = require('chalk');


let Q = require('q');

let self = module.exports = {
    generateNotification: function (notification) {
        /** Notification object include the following
         * sender
         * recipient
         * type: notification type
         * article_id: article_id
         */
        let defer = Q.defer();
        self.generateMessageOnType(notification).then(notification => {
            defer.resolve(notification);
        })
        return defer.promise;

    },

    generateMessageOnType: function (data) {
        let defer = Q.defer();

        self.getTemplateMessageOnType(data.type).then(message => {
            if (data.type == 'mentioned') {
                ArticleService.findOnePromise(data.article_id).then(article => {
                    UserService.getIdAndUsernameWithProfileImage(data.sender).then(info => {
                        let generatedMessage = info.username + " " + message + " " + article.title; 
                        defer.resolve(generatedMessage);
                    })
                })
            }
        });
        return defer.promise;
    },


    getTemplateMessageOnType: function (typeName) {
        let defer = Q.defer();
        NotificationType.findOne({
            "type": typeName
        }, function (err, doc) {
            if (err) defer.reject(err);

            defer.resolve(doc.templateMessage);
        });
        return defer.promise;
    }

}