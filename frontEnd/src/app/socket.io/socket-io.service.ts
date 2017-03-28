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
}


