/** User Connection Handler
 * Use to receive event that which user connect to server - disconnect
 */

module.exports = function (socket) {
    socket.on('send message', function (message) {
        console.log('Message: ' + message + ' from ' + socket.id);
    });
    socket.on('disconnect', function () {
        /** Remove this socket connection */
        console.log('User ' + socket.id + ' disconnected....');
        socket.disconnect();
    });


    socket.on('browse category', function (userId, username, categoryId) {
        console.log('User '+ username+' with id '+userId+' is browsing category '+categoryId);
    });
}