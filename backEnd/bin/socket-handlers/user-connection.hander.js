/** User Connection Handler
 * Use to receive event that which user connect to server - disconnect
 */
let trackerService = require('../../mongoose/services/tracker-service');

let notificationService = require('../../mongoose/services/notification/notification-service');

let socketsConnectionManager = require('./sockets-connection-manager');
const chalk = require('chalk');
let self = module.exports = function (socket) {

    socket.on('disconnect', function () {
        /** Remove this socket connection */       
        socketsConnectionManager.removeUserSockets(socket);
        socket.disconnect();

    });

    socket.on('category browsing', function (data) {
        trackerService.trackUserCategory(data);
    });

    socket.on('subscribeNotification', function (data) {
        // Get new notification by user_id here ....
        let userId = data.user_id;
        notificationService.findbyUser(userId, function (err, notifications) {
            if (err) {
                socket.emit('failure');
            }
            socket.emit('sendNotificationsToUser', notifications);
        });
    });

    socket.on('pushNotificationToUsers', function (users) {
        let connectedUsers = socketsConnectionManager.getUserSockets();
        /*Iterate through array of user who has new notification */
        for (let user_id of users) {
            // loop through connected socket to find which socket he is using
            for (let connectedUser of connectedUsers) {
                if (connectedUser.user_id == user_id) {
                    notificationService.findbyUser(user_id, function (err, notifications) {
                        if (err) {
                            connectedUser.socket.emit('failure');
                        }
                        connectedUser.socket.emit('sendNotificationsToUser', notifications);
                    });
                }
            }
        }

    });
}