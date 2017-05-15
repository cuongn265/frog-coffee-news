let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;


let NotificationSchema = new Schema({
    recipient: {
      type: ObjectId,
      ref: 'users'
    },
    sender: {
      type: ObjectId,
      ref: 'users'
    },
    message: String,
    seen: Boolean,
    read: Boolean
});

let APISources = mongoose.model('notifications', ApiSourceSchema); 

module.exports = APISources;




