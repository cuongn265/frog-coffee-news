/**
 * Configure Socket IO on Client side
 */
import * as io from 'socket.io-client';
export class SocketIOService {
    private url:string = process.env.hostUrl;
    private socket;
    //constructor
    constructor(){

    }
    initializeSocketInstance(){
        this.socket = io(this.url);
    }
    getSocketInstance(){
        return this.socket;
    }

    /**
     * Configure event emitter -----------------------------------------
     */

    sendUserCategoryBrowsingEvent(userId: String, categoryName: String){
        let data = {
            user_id: userId,
            category: categoryName
        };
        this.socket.emit('category browsing', data);
    }

    /**
     * End of configuring event emitter -----------------------------------------
     */

}


