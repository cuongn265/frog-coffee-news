/**
 * Configure Socket IO on Client side
 */
import * as io from 'socket.io-client';
export class SocketIOService {
    private url: string = process.env.hostUrl;
    private socket;
    //constructor
    constructor() {

    }
    initializeSocketInstance() {
        this.socket = io(this.url);
    }
    getSocketInstance() {
        return this.socket;
    }

    /**
     * Configure event emitter -----------------------------------------
     */

    subscribeUser(userId: string) {
        let socket = this.socket;
        let data = {
            user_id: userId
        };
        // Emit socket
        socket.emit('loggedIn', data);
        socket.emit('subscribeNotification', data);
    }

    listenToNotification() {
        let socket = this.socket;
        socket.on('sendNotificationsToUser', function (notifications) {
            console.log('Got my notification');
            console.log(notifications);
        });
    }

    sendUserCategoryBrowsingEvent(userId: String, categoryName: String) {
        let socket = this.socket;
        let data = {
            user_id: userId,
            category: categoryName
        };
        // make sure user stay on this category at least 5 seconds
        setTimeout(function () {
            console.log('message emitted');
            socket.emit('category browsing', data);
        }, 5000);
    }





    /**
     * End of configuring event emitter -----------------------------------------
     */

}


