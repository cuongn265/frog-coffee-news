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

            // switch (data.type) {
            //     case 'mentioned':
            //         {


            //         }
            //     case 'new activities':
            //         {

            //         }
            // }


            if (data.type == 'mentioned') {
                ArticleService.findOnePromise(data.article_id).then(article => {
                    let notification = {
                        "article": undefined,
                        "sender": undefined,
                        "message": undefined,
                        "seen": undefined,
                        "read": undefined
                    };
                    // notification.article = article.title;
                    console.log(data.sender);
                    console.log(chalk.yellow('Resolve successfully at generateMessageOnType: ' + article.title));
                    UserService.getIdAndUsername(data.sender).then(info => {

                        notification.article = article.title;
                        notification.sender = info.username;
                        notification.message = notification.sender + " " + message + " " + notification.article;
                        notification.seen = false;
                        notification.read = false;
                        console.log(chalk.blue('successfully reolsve'));
                        defer.resolve(notification);
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