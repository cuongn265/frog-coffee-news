// Sockets Manager
const chalk = require('chalk');

let userSockets = [];
let connectedUsers = [];
let io;
let self = module.exports = {
  construct(server) {
    io = server;
  },

  getUserSockets() {
    return userSockets;
  },

  pushUserSockets(socket) {
    socket.on('loggedIn', function (data) {
      let user_id = data.user_id;
      userSockets.push({
        user_id: user_id,
        socket: socket
      });
    });
  },

  removeUserSockets(socket){
    for (let i = 0; i < userSockets.length; i++) {
      if(socket.id == userSockets[i].socket.id){
        userSockets.splice(i,1);
      }
    }
  }
}