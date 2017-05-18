/** User Connection Handler
 * Use to receive event that which user connect to server - disconnect
 */
let trackerService = require('../../mongoose/services/tracker-service');

let notificationService = require('../../mongoose/services/notification/notification-service');
const chalk = require('chalk');
let self = module.exports = function (socket) {

    socket.on('disconnect', function () {
        /** Remove this socket connection */
        console.log('User ' + socket.id + ' disconnected....');
        socket.disconnect();
    });




    socket.on('category browsing', function (data) {
        trackerService.trackUserCategory(data);
    });

    socket.on('subscribeNotification', function (data) {
        // Get new notification by user_id here ....

        let userId = data.user_id;
        console.log(chalk.yellow('Notifcation Request for user '+userId));
        notificationService.findbyUser(userId, function (err, notifications) {
            if (err) {
                socket.emit('failure');
            }
            console.log(chalk.blue(notifications));

            socket.emit('sendNotificationsToUser', notifications);
        });
    });
}