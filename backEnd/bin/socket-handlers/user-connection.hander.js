/** User Connection Handler
 * Use to receive event that which user connect to server - disconnect
 */
let trackerService = require('../../mongoose/services/tracker-service');

module.exports = function (socket) {
    socket.on('send message', function (message) {
        console.log('Message: ' + message + ' from ' + socket.id);
    });
    socket.on('disconnect', function () {
        /** Remove this socket connection */
        console.log('User ' + socket.id + ' disconnected....');
        socket.disconnect();
    });


    socket.on('category browsing', function (data) {
        trackerService.trackUserCategory(data);
    });
}